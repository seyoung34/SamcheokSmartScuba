"use client";

import { motion } from "framer-motion";
import { Shield, Heart, TriangleAlert, CircleCheck } from 'lucide-react';

export default function Safety() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl mb-6">Safety First</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            안전은 우리의 최우선 가치입니다
          </p>
        </motion.div>

        {/* Safety Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Shield,
              title: '전문 강사',
              description: '국제 공인 자격을 보유한 전문 강사진',
            },
            {
              icon: Heart,
              title: '건강 검진',
              description: '다이빙 전 필수 건강 상태 확인',
            },
            {
              icon: TriangleAlert,
              title: '응급 대비',
              description: '즉각적인 응급 처치 시스템',
            },
            {
              icon: CircleCheck,
              title: '장비 점검',
              description: '매 다이빙 전 철저한 장비 점검',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 text-center"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Safety Rules */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg p-8 mb-16"
        >
          <h2 className="text-3xl mb-6 text-primary">안전 수칙</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl mb-4">다이빙 전</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>건강 상태 확인 및 의료 설문지 작성</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>브리핑 참석 및 다이빙 계획 확인</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>장비 점검 및 기능 테스트</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>버디 시스템 확인</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl mb-4">다이빙 중</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>강사의 지시사항 준수</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>버디와 항상 시야 내 유지</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>공기량 및 수심 지속적 확인</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>천천히 상승하며 안전 정지 실시</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Equipment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg p-8 mb-16"
        >
          <h2 className="text-3xl mb-6 text-primary">장비 및 시설</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: '최신 다이빙 장비',
                items: ['BCD', '레귤레이터', '다이빙 컴퓨터', '웨트슈트'],
              },
              {
                title: '안전 장비',
                items: ['응급 산소 공급 장치', 'AED', '구급 상자', '비상 연락망'],
              },
              {
                title: '보험 및 인증',
                items: ['다이빙 보험', 'PADI 공인 센터', 'DAN 회원', '사업자 보험'],
              },
            ].map((category, index) => (
              <div key={category.title}>
                <h3 className="text-xl mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <CircleCheck className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-primary/50 rounded-lg p-8"
        >
          <h2 className="text-3xl mb-4 text-primary">긴급 연락처</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
            <div>
              <p className="mb-2">센터 긴급 연락처</p>
              <p className="text-2xl text-foreground">010-1234-5678</p>
            </div>
            <div>
              <p className="mb-2">해양 경찰</p>
              <p className="text-2xl text-foreground">122</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}