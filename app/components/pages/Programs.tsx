"use client";

import { motion } from "framer-motion";

const programs = [
  {
    title: 'Discovery Scuba Diving',
    level: '입문',
    duration: '1일',
    price: '150,000원',
    description: '처음 다이빙을 경험해보는 분들을 위한 프로그램',
    features: [
      '이론 교육 (1시간)',
      '수영장 실습',
      '얕은 바다 체험 다이빙',
      '모든 장비 제공',
    ],
  },
  {
    title: 'Open Water Diver',
    level: '초급',
    duration: '3-4일',
    price: '550,000원',
    description: 'PADI 오픈워터 다이버 자격증 취득 과정',
    features: [
      '온라인 이론 교육',
      '수영장 실습 (5회)',
      '오픈워터 실습 (4회)',
      '국제 공인 자격증 발급',
    ],
  },
  {
    title: 'Advanced Open Water',
    level: '중급',
    duration: '2-3일',
    price: '450,000원',
    description: '심화 다이빙 스킬과 특수 다이빙 교육',
    features: [
      '딥 다이빙',
      '수중 네비게이션',
      '야간 다이빙',
      '특수 환경 다이빙',
    ],
  },
  {
    title: 'Rescue Diver',
    level: '고급',
    duration: '3-4일',
    price: '600,000원',
    description: '구조 다이빙 기술과 응급 처치 교육',
    features: [
      '사고 예방 및 관리',
      '응급 처치 교육',
      '구조 시나리오 훈련',
      'EFR 자격증 포함',
    ],
  },
];

export default function Programs() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl mb-6">Our Programs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            초보자부터 전문가까지, 당신의 레벨에 맞는 프로그램을 선택하세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                  {program.level}
                </span>
                <span className="text-2xl text-primary">{program.price}</span>
              </div>

              <h3 className="text-2xl mb-2">{program.title}</h3>
              <p className="text-muted-foreground mb-4">
                {program.description}
              </p>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <span>⏱️ {program.duration}</span>
                </div>

                <div className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 bg-primary hover:bg-[#1F6ED6] text-primary-foreground rounded-lg transition-colors">
                자세히 보기
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-card border border-border rounded-lg p-8"
        >
          <h2 className="text-2xl mb-4 text-primary">참고 사항</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• 모든 프로그램은 사전 예약이 필요합니다</li>
            <li>• 건강 상태에 따라 다이빙이 제한될 수 있습니다</li>
            <li>• 그룹 예약 시 할인 혜택이 제공됩니다</li>
            <li>• 장비 대여료가 포함되어 있습니다</li>
            <li>• 자격증 발급 비용은 별도입니다</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
