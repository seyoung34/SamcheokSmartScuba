"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export default function Location() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl mb-6">Location</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            삼척의 아름다운 바다에서 만나요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-lg overflow-hidden h-96"
          >
            <div className="w-full h-full bg-secondary flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
              <div className="relative z-10 text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">지도 영역</p>
                <p className="text-sm text-muted-foreground mt-2">
                  강원도 삼척시 근덕면 삼척해변로 123
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg mb-2">주소</h3>
                  <p className="text-muted-foreground">
                    강원도 삼척시 근덕면 삼척해변로 123
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Samcheok Smart Scuba Center
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg mb-2">연락처</h3>
                  <p className="text-muted-foreground">전화: 033-123-4567</p>
                  <p className="text-muted-foreground">휴대폰: 010-1234-5678</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg mb-2">이메일</h3>
                  <p className="text-muted-foreground">info@samcheokscuba.com</p>
                  <p className="text-muted-foreground">booking@samcheokscuba.com</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg mb-2">운영 시간</h3>
                  <p className="text-muted-foreground">평일: 09:00 - 18:00</p>
                  <p className="text-muted-foreground">주말: 08:00 - 19:00</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    * 동절기(11월-2월)는 사전 예약 필수
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* How to Get Here */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-card border border-border rounded-lg p-8"
        >
          <h2 className="text-3xl mb-6 text-primary">오시는 길</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-4">자가용</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 영동고속도로 → 동해고속도로</li>
                <li>• 삼척IC 하차 → 7번 국도</li>
                <li>• 근덕면 방면 → 삼척해변로</li>
                <li>• 센터 주차장 이용 가능 (무료)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl mb-4">대중교통</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• KTX: 동해역 하차 → 택시 20분</li>
                <li>• 고속버스: 삼척터미널 하차 → 택시 15분</li>
                <li>• 시내버스: 123번, 456번 이용</li>
                <li>• 센터 셔틀버스 운영 (사전 예약 시)</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Nearby Attractions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-card border border-border rounded-lg p-8"
        >
          <h2 className="text-3xl mb-6 text-primary">주변 관광지</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: '삼척 해수욕장', distance: '도보 5분' },
              { name: '환선굴', distance: '차량 20분' },
              { name: '죽서루', distance: '차량 15분' },
              { name: '맹방해수욕장', distance: '차량 10분' },
              { name: '삼척 해양레일바이크', distance: '차량 25분' },
              { name: '이사부사자공원', distance: '차량 10분' },
            ].map((place, index) => (
              <div
                key={place.name}
                className="flex items-center justify-between p-4 bg-secondary rounded-lg"
              >
                <span>{place.name}</span>
                <span className="text-sm text-primary">{place.distance}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
