import { Badge, BadgeRequirement } from '@/types';
import { badgeData } from '@/data/badges';
import { db } from '@/lib/database/queries';

export class BadgeEngine {
  private badges: Badge[] = badgeData;

  async checkAndAwardBadges(userId: string): Promise<Badge[]> {
    const progress = await db.progress.get(userId);
    if (!progress) return [];

    const userBadges = await db.gamification.getUserBadges(userId);
    const earnedBadgeIds = new Set((userBadges as Array<{ badgeId: string }>).map(ub => ub.badgeId));

    const newBadges: Badge[] = [];

    for (const badge of this.badges) {
      if (!earnedBadgeIds.has(badge.id) && this.checkRequirement(badge.requirement, progress)) {
        try {
          await db.gamification.awardBadge(userId, badge.id);
          await db.progress.addPoints(
            userId,
            badge.points,
            'badge-earned',
            `Earned badge: ${badge.name}`
          );
          newBadges.push(badge);
        } catch (error) {
          console.error(`Failed to award badge ${badge.id}:`, error);
        }
      }
    }

    return newBadges;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private checkRequirement(requirement: BadgeRequirement, progress: any): boolean {
    switch (requirement.type) {
      case 'streak-days':
        return progress.currentStreak >= requirement.value;

      case 'problems-solved':
        return progress.practiceProblemsCompleted >= requirement.value;

      case 'diagnostic-complete':
        return progress.completedDiagnostics >= requirement.value;

      case 'accuracy-rate':
        const avgAccuracy = this.calculateAverageAccuracy(progress.conceptMastery);
        return avgAccuracy >= requirement.value;

      case 'concept-mastery':
        if (!requirement.conceptId) return false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const concept = progress.conceptMastery.find((cm: any) => cm.conceptId === requirement.conceptId);
        return concept ? concept.masteryLevel >= requirement.value : false;

      default:
        return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private calculateAverageAccuracy(conceptMastery: any[]): number {
    if (conceptMastery.length === 0) return 0;
    const totalAccuracy = conceptMastery.reduce((sum, cm) => sum + cm.accuracy, 0);
    return totalAccuracy / conceptMastery.length;
  }

  getBadgeByCategory(category: string): Badge[] {
    return this.badges.filter(badge => badge.category === category);
  }

  getBadgeById(id: string): Badge | undefined {
    return this.badges.find(badge => badge.id === id);
  }

  async getProgress(userId: string, badgeId: string): Promise<{
    badge: Badge;
    progress: number;
    isEarned: boolean;
  } | null> {
    const badge = this.getBadgeById(badgeId);
    if (!badge) return null;

    const progress = await db.progress.get(userId);
    if (!progress) return null;

    const userBadges = await db.gamification.getUserBadges(userId);
    const isEarned = (userBadges as Array<{ badgeId: string }>).some(ub => ub.badgeId === badgeId);

    let progressValue = 0;

    switch (badge.requirement.type) {
      case 'streak-days':
        progressValue = Math.min(100, (progress.currentStreak / badge.requirement.value) * 100);
        break;

      case 'problems-solved':
        progressValue = Math.min(100, (progress.practiceProblemsCompleted / badge.requirement.value) * 100);
        break;

      case 'diagnostic-complete':
        progressValue = Math.min(100, (progress.completedDiagnostics / badge.requirement.value) * 100);
        break;

      case 'accuracy-rate':
        const accuracy = this.calculateAverageAccuracy(progress.conceptMastery);
        progressValue = Math.min(100, (accuracy / badge.requirement.value) * 100);
        break;

      case 'concept-mastery':
        if (badge.requirement.conceptId) {
          const concept = (progress.conceptMastery as Array<{ conceptId: string; masteryLevel: number }>).find(cm => cm.conceptId === badge.requirement.conceptId);
          progressValue = concept ? Math.min(100, (concept.masteryLevel / badge.requirement.value) * 100) : 0;
        }
        break;
    }

    return {
      badge,
      progress: progressValue,
      isEarned,
    };
  }
}