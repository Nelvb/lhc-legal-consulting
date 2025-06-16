/**
 * LegalAreaContent.tsx
 *
 * Componente principal para mostrar el contenido completo de un área legal.
 * Renderiza datos desde JSON: introducción, secciones, subtemas, FAQs, stats y CTA.
 * Diseño consistente con BlogPage y Hero: gradiente + fondo claro + tipografías Inter.
 * Animaciones suaves y elementos interactivos profesionales.
 */

'use client';

import React, { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { LegalAreaContentProps } from '@/types/legalArea';
import { ChevronDown, ChevronRight, Star, Clock, Trophy, Users, Euro, FileCheck, Globe, Shield, Car, Receipt, Briefcase, Heart, Scale, Building, Search, AlertTriangle, Calculator, Home, Flag, HeartHandshake, UsersRound, ShieldAlert, UserX, UserCheck, CreditCard, TrendingUp, BarChart, Banknote, FileText, FileSignature, Scroll, HeartCrack, HeartPulse, Settings, IdCard } from 'lucide-react';

// Mapeo de iconos para subtemas
const iconMap: { [key: string]: React.ReactNode } = {
  car: <Car className="w-6 h-6" />,
  receipt: <Receipt className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  scale: <Scale className="w-6 h-6" />,
  'user-check': <UserCheck className="w-6 h-6" />,
  'user-x': <UserX className="w-6 h-6" />,
  euro: <Euro className="w-6 h-6" />,
  settings: <Settings className="w-6 h-6" />,
  'shield-alert': <ShieldAlert className="w-6 h-6" />,
  'heart-pulse': <HeartPulse className="w-6 h-6" />,
  'file-text': <FileText className="w-6 h-6" />,
  scroll: <Scroll className="w-6 h-6" />,
  'heart-crack': <HeartCrack className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  banknote: <Banknote className="w-6 h-6" />,
  'shield-check': <Shield className="w-6 h-6" />,
  'file-signature': <FileSignature className="w-6 h-6" />,
  'id-card': <IdCard className="w-6 h-6" />,
  home: <Home className="w-6 h-6" />,
  'users-round': <UsersRound className="w-6 h-6" />,
  flag: <Flag className="w-6 h-6" />,
  'heart-handshake': <HeartHandshake className="w-6 h-6" />,
  search: <Search className="w-6 h-6" />,
  'alert-triangle': <AlertTriangle className="w-6 h-6" />,
  calculator: <Calculator className="w-6 h-6" />,
  building: <Building className="w-6 h-6" />,
  'credit-card': <CreditCard className="w-6 h-6" />,
  'trending-up': <TrendingUp className="w-6 h-6" />,
  'bar-chart': <BarChart className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
  gavel: <Scale className="w-6 h-6" />,
  'file-check': <FileCheck className="w-6 h-6" />,
};

// Mapeo de iconos para estadísticas
const statsIconMap: { [key: string]: React.ReactNode } = {
  trophy: <Trophy className="w-8 h-8" />,
  clock: <Clock className="w-8 h-8" />,
  star: <Star className="w-8 h-8" />,
  euro: <Euro className="w-8 h-8" />,
  users: <Users className="w-8 h-8" />,
  'file-check': <FileCheck className="w-8 h-8" />,
  globe: <Globe className="w-8 h-8" />,
  shield: <Shield className="w-8 h-8" />,
  scroll: <Scroll className="w-8 h-8" />,
  heart: <Heart className="w-8 h-8" />,
};

const LegalAreaContent: React.FC<LegalAreaContentProps> = ({ areaData, areaConfig }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const { ref: introRef, inView: introInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: sectionsRef, inView: sectionsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: subtopicsRef, inView: subtopicsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: faqsRef, inView: faqsInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        
        {/* Introducción */}
        <section ref={introRef} className="mb-16 lg:mb-20">
          <div className={`
            max-w-4xl mx-auto text-center
            transition-all duration-700 transform
            ${introInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}>
            <div className="prose prose-lg lg:prose-xl mx-auto">
              <p 
                className="text-lg lg:text-xl text-gray-700 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {areaData.introduction}
              </p>
            </div>
          </div>
        </section>

        {/* Secciones de Contenido */}
        {areaData.contentSections && areaData.contentSections.length > 0 && (
          <section ref={sectionsRef} className="mb-16 lg:mb-20">
            <div className="max-w-5xl mx-auto space-y-12">
              {areaData.contentSections
                .sort((a, b) => a.order - b.order)
                .map((section, index) => (
                  <div
                    key={index}
                    className={`
                      transition-all duration-700 transform
                      ${sectionsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100">
                      <h3 
                        className="text-2xl lg:text-3xl font-bold text-[#1b2f4b] mb-6"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {section.title}
                      </h3>
                      
                      <div 
                        className="prose prose-lg max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Subtemas/Servicios */}
        {areaData.subtopics && areaData.subtopics.length > 0 && (
          <section ref={subtopicsRef} className="mb-16 lg:mb-20">
            <div className="max-w-6xl mx-auto">
              <div className={`
                text-center mb-12
                transition-all duration-700 transform
                ${subtopicsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}>
                <h2 
                  className="text-3xl lg:text-4xl font-bold text-[#1b2f4b] mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Nuestros Servicios Especializados
                </h2>
                <div 
                  className="w-24 h-1 mx-auto rounded-full"
                  style={{ backgroundColor: areaConfig.color }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {areaData.subtopics.map((subtopic, index) => (
                  <div
                    key={index}
                    className={`
                      group bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100
                      hover:shadow-2xl hover:-translate-y-2 transition-all duration-500
                      transition-all duration-700 transform
                      ${subtopicsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {/* Icono */}
                    <div className="mb-6">
                      <div 
                        className="inline-flex items-center justify-center w-14 h-14 rounded-xl text-white shadow-lg"
                        style={{ backgroundColor: areaConfig.color }}
                      >
                        {subtopic.icon && iconMap[subtopic.icon] || <Scale className="w-6 h-6" />}
                      </div>
                    </div>

                    {/* Contenido */}
                    <h3 className="text-xl font-bold text-[#1b2f4b] mb-3">
                      {subtopic.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {subtopic.description}
                    </p>

                    {subtopic.content && (
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {subtopic.content}
                      </p>
                    )}

                    {/* Indicador visual */}
                    <div 
                      className="mt-6 w-12 h-1 rounded-full group-hover:w-20 transition-all duration-300"
                      style={{ backgroundColor: areaConfig.color }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Estadísticas */}
        {areaData.stats && areaData.stats.length > 0 && areaData.displayConfig?.showStats && (
          <section ref={statsRef} className="mb-16 lg:mb-20">
            <div 
              className="rounded-3xl p-12 lg:p-16 shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${areaConfig.color}15 0%, ${areaConfig.hoverColor}10 100%)`
              }}
            >
              <div className="max-w-5xl mx-auto">
                <div className={`
                  text-center mb-12
                  transition-all duration-700 transform
                  ${statsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                `}>
                  <h2 
                    className="text-3xl lg:text-4xl font-bold text-[#1b2f4b] mb-4"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Resultados que Hablan por Sí Solos
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {areaData.stats.map((stat, index) => (
                    <div
                      key={index}
                      className={`
                        text-center bg-white rounded-2xl p-8 shadow-lg
                        transition-all duration-700 transform
                        ${statsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                      `}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <div className="mb-4">
                        <div 
                          className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white shadow-lg"
                          style={{ backgroundColor: areaConfig.color }}
                        >
                          {stat.icon && statsIconMap[stat.icon] || <Star className="w-8 h-8" />}
                        </div>
                      </div>
                      
                      <div 
                        className="text-4xl lg:text-5xl font-bold mb-2"
                        style={{ color: areaConfig.color }}
                      >
                        {stat.value}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-[#1b2f4b] mb-2">
                        {stat.title}
                      </h3>
                      
                      {stat.description && (
                        <p className="text-gray-600">
                          {stat.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Preguntas Frecuentes */}
        {areaData.faqs && areaData.faqs.length > 0 && (
          <section ref={faqsRef} className="mb-16 lg:mb-20">
            <div className="max-w-4xl mx-auto">
              <div className={`
                text-center mb-12
                transition-all duration-700 transform
                ${faqsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}>
                <h2 
                  className="text-3xl lg:text-4xl font-bold text-[#1b2f4b] mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Preguntas Frecuentes
                </h2>
                <div 
                  className="w-24 h-1 mx-auto rounded-full"
                  style={{ backgroundColor: areaConfig.color }}
                />
              </div>

              <div className="space-y-4">
                {areaData.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`
                      bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden
                      transition-all duration-700 transform
                      ${faqsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg lg:text-xl font-semibold text-[#1b2f4b] pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {expandedFaq === index ? (
                            <ChevronDown 
                              className="w-6 h-6 transition-colors duration-300"
                              style={{ color: areaConfig.color }}
                            />
                          ) : (
                            <ChevronRight 
                              className="w-6 h-6 text-gray-400 hover:text-[#1b2f4b] transition-colors duration-300"
                            />
                          )}
                        </div>
                      </div>
                    </button>
                    
                    {expandedFaq === index && (
                      <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Final */}
        {areaData.cta && (
          <section className="mb-16">
            <div 
              className="rounded-3xl p-12 lg:p-16 text-center shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${areaConfig.color} 0%, ${areaConfig.hoverColor} 100%)`
              }}
            >
              <div className="max-w-3xl mx-auto">
                <h2 
                  className="text-3xl lg:text-4xl font-bold text-white mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {areaData.cta.title}
                </h2>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  {areaData.cta.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    className="bg-white text-[#1b2f4b] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                    onClick={() => {
                      if (areaData.cta.primaryButton.action === 'contact') {
                        window.location.href = '/contacto';
                      } else if (areaData.cta.primaryButton.action === 'phone') {
                        window.location.href = `tel:${areaData.cta.primaryButton.value}`;
                      }
                    }}
                  >
                    {areaData.cta.primaryButton.text}
                  </button>
                  
                  {areaData.cta.secondaryButton && (
                    <button 
                      className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-[#1b2f4b] transition-all duration-300"
                      onClick={() => {
                        if (areaData.cta.secondaryButton?.action === 'phone') {
                          window.location.href = `tel:${areaData.cta.secondaryButton.value}`;
                        } else if (areaData.cta.secondaryButton?.action === 'whatsapp') {
                          window.open(`https://wa.me/${areaData.cta.secondaryButton.value}`, '_blank');
                        }
                      }}
                    >
                      {areaData.cta.secondaryButton.text}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default LegalAreaContent;