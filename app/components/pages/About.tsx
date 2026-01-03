"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl mb-8">About Us</h1>

          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl mb-4 text-primary">Our Story</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Samcheok Smart Scuba는 2020년에 설립된 삼척 지역 최고의 스쿠버 다이빙 센터입니다.
              우리는 안전하고 즐거운 다이빙 경험을 제공하기 위해 최선을 다하고 있습니다.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              삼척의 아름다운 동해 바다에서 다이빙의 즐거움을 경험하세요.
              초보자부터 전문가까지 모든 레벨의 다이버를 환영합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl mb-4 text-primary">Our Mission</h3>
              <p className="text-muted-foreground">
                안전하고 전문적인 교육을 통해 더 많은 사람들이
                스쿠버 다이빙의 즐거움을 경험할 수 있도록 돕습니다.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl mb-4 text-primary">Our Values</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• 안전 최우선</li>
                <li>• 전문성과 신뢰</li>
                <li>• 환경 보호</li>
                <li>• 고객 만족</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl mb-6 text-primary">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: '김다이버', role: '수석 강사', cert: 'PADI Master Instructor' },
                { name: '이스쿠버', role: '안전 관리자', cert: 'PADI Course Director' },
                { name: '박해양', role: '장비 전문가', cert: 'Equipment Specialist' },
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-secondary rounded-lg"
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                    👨‍🏫
                  </div>
                  <h4 className="mb-2">{member.name}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{member.role}</p>
                  <p className="text-xs text-accent">{member.cert}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
