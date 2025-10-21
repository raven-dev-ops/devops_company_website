// components/Services.jsx

import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    name: 'DevOps & Cloud Infrastructure',
    desc:
      'Design and operate reliable cloud platforms. CI/CD pipelines, infrastructure as code, observability, autoscaling, and cost-aware operations across AWS and Azure.',
    points: ['Cloud architecture & automation', 'CI/CD implementation & hardening', 'SRE practices & monitoring'],
  },
  {
    name: 'Analytics Dashboards',
    desc:
      'Real-time dashboards and data visualization to drive decisions. Integrate sources, model KPIs, and expose insights securely to stakeholders.',
    points: ['Source integrations & data modeling', 'KPI definition & visualization', 'Secure access & governance'],
  },
  {
    name: 'Custom Software Development',
    desc:
      'Tailored web and service development to eliminate manual inefficiencies and enable scale. From internal tools to client-facing applications.',
    points: ['Modern web apps & APIs', 'Automation & workflow tools', 'Quality engineering & testing'],
  },
  {
    name: 'CI/CD Packages & Retainers',
    desc:
      'Ongoing CI/CD maintenance and optimization. Proactive pipeline monitoring, build/test improvements, and dedicated support for deployment issues.',
    points: ['Proactive pipeline monitoring', 'Developer experience improvements', 'Dedicated release support'],
  },
];

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const Services = ({ id }) => {
  return (
    <section id={id} className="py-16 px-6 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-4">Core Services</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          A focused set of offerings to accelerate software delivery, simplify operations, and surface actionable insights.
        </p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((s) => (
            <motion.div key={s.name} variants={item} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-raven-dark mb-2">{s.name}</h3>
              <p className="text-gray-700 mb-3">{s.desc}</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

