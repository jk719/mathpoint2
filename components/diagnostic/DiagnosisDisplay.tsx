'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { FinalDiagnosis } from '@/types';
import { CheckCircle2, AlertCircle, TrendingUp, Clock, Lightbulb } from 'lucide-react';

interface DiagnosisDisplayProps {
  diagnosis: FinalDiagnosis;
  onRestart?: () => void;
}

export function DiagnosisDisplay({ diagnosis, onRestart }: DiagnosisDisplayProps) {
  const levelColors = {
    beginner: 'bg-yellow-100 text-yellow-800',
    intermediate: 'bg-orange-100 text-orange-800',
    advanced: 'bg-green-100 text-green-800',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-6"
    >
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#1a3a52] to-[#ff6b35] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Diagnostic Complete!</CardTitle>
            <div className="flex justify-center mt-4">
              <Badge className={levelColors[diagnosis.overallLevel]}>
                {diagnosis.overallLevel.charAt(0).toUpperCase() + diagnosis.overallLevel.slice(1)} Level
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 leading-relaxed">
              {diagnosis.detailedSummary}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-gray-900">Strengths</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {diagnosis.strengths.length > 0 ? (
                <div className="space-y-3">
                  {diagnosis.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{strength.concept.name}</span>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={strength.confidence * 100}
                          className="w-20"
                          variant="success"
                        />
                        <span className="text-sm text-gray-500">
                          {Math.round(strength.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Continue practicing to build strengths
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="text-gray-900">Areas for Improvement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {diagnosis.weaknesses.length > 0 ? (
                <div className="space-y-4">
                  {diagnosis.weaknesses.map((weakness, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{weakness.concept.name}</span>
                        <span className="text-sm text-gray-500">
                          Needs practice
                        </span>
                      </div>
                      {weakness.suggestedPractice.length > 0 && (
                        <div className="pl-4">
                          <p className="text-sm text-gray-600">
                            Suggested: {weakness.suggestedPractice[0]}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Great job! No major weaknesses identified.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {diagnosis.errorPatterns.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Error Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {diagnosis.errorPatterns.map((pattern, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium capitalize">
                        {pattern.type.replace('-', ' ')}
                      </span>
                      <Badge variant="outline">
                        {Math.round(pattern.frequency * 100)}%
                      </Badge>
                    </div>
                    {pattern.examples.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Example: {pattern.examples[0]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Recommended Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {diagnosis.recommendedPath}
              </p>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {diagnosis.estimatedTimeToMastery}
                </div>
                <div className="text-sm text-blue-700">
                  <div className="font-medium">hours estimated</div>
                  <div>to reach mastery</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center gap-4 pt-6">
        <Button variant="outline" onClick={onRestart}>
          Take Another Diagnostic
        </Button>
        <Button variant="gradient">
          Start Practice Problems
        </Button>
      </motion.div>
    </motion.div>
  );
}