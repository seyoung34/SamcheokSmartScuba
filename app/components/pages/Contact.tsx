"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import { Send, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현에서는 여기에 폼 전송 로직이 들어갑니다
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        program: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            문의사항이 있으시면 언제든지 연락주세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2">전화 문의</h3>
                  <p className="text-muted-foreground text-sm mb-1">033-123-4567</p>
                  <p className="text-muted-foreground text-sm">010-1234-5678</p>
                  <p className="text-xs text-muted-foreground mt-2">평일 9:00 - 18:00</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2">이메일</h3>
                  <p className="text-muted-foreground text-sm mb-1">
                    info@samcheokscuba.com
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    24시간 이내 답변
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2">카카오톡</h3>
                  <p className="text-muted-foreground text-sm mb-1">@삼척스마트스쿠버</p>
                  <p className="text-xs text-muted-foreground mt-2">실시간 상담 가능</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-primary/10 border border-primary/30 rounded-lg p-6"
            >
              <h3 className="mb-3 text-primary">빠른 예약 문의</h3>
              <p className="text-sm text-muted-foreground mb-4">
                전화나 카카오톡으로 빠른 예약이 가능합니다
              </p>
              <button className="w-full py-3 bg-primary hover:bg-[#1F6ED6] text-primary-foreground rounded-lg transition-colors">
                카카오톡 상담하기
              </button>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl mb-6">문의하기</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl mb-2 text-primary">문의가 전송되었습니다!</h3>
                  <p className="text-muted-foreground">
                    빠른 시일 내에 답변드리겠습니다.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm">
                        이름 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        placeholder="홍길동"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm">
                        이메일 *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm">
                        연락처 *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        placeholder="010-1234-5678"
                      />
                    </div>

                    <div>
                      <label htmlFor="program" className="block mb-2 text-sm">
                        관심 프로그램
                      </label>
                      <select
                        id="program"
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      >
                        <option value="">선택하세요</option>
                        <option value="discovery">Discovery Scuba Diving</option>
                        <option value="openwater">Open Water Diver</option>
                        <option value="advanced">Advanced Open Water</option>
                        <option value="rescue">Rescue Diver</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm">
                      문의 내용 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                      placeholder="문의하실 내용을 자유롭게 작성해주세요"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary hover:bg-[#1F6ED6] text-primary-foreground rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    문의하기
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-card border border-border rounded-lg p-8"
        >
          <h2 className="text-3xl mb-6 text-primary">자주 묻는 질문</h2>
          <div className="space-y-4">
            {[
              {
                q: '다이빙 경험이 없어도 참여할 수 있나요?',
                a: '네, Discovery Scuba Diving 프로그램은 경험이 없는 분들을 위한 입문 과정입니다.',
              },
              {
                q: '개인 장비가 없어도 되나요?',
                a: '모든 필요한 장비는 센터에서 제공됩니다. 수영복만 준비해 오시면 됩니다.',
              },
              {
                q: '예약은 어떻게 하나요?',
                a: '전화, 이메일, 또는 카카오톡으로 예약 가능하며, 최소 3일 전 예약을 권장합니다.',
              },
              {
                q: '취소 정책은 어떻게 되나요?',
                a: '3일 전 취소 시 전액 환불, 당일 취소 시 50% 환불 정책이 적용됩니다.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="border-b border-border last:border-0 pb-4 last:pb-0"
              >
                <h4 className="mb-2">Q. {faq.q}</h4>
                <p className="text-muted-foreground text-sm">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
