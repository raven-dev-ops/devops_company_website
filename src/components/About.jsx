import React from 'react';
import { motion } from 'framer-motion';

const About = ({ id }) => (
  <section id={id} className="py-16 px-6 lg:py-24 bg-raven-light">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-6">About RAV DevOps</h2>
      <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
        Raven Development Operations (RAV DevOps) is a veteran-owned, US-based technology partner focused on eliminating inefficiencies and enabling growth through disciplined engineering.
      </p>

      <div className="space-y-8">
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-raven-dark mb-2">Mission & Values</h3>
          <p className="text-gray-700">
            Our mission is to deliver innovative DevOps and software solutions that enable organizations to operate efficiently, securely, and at scale.
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-3 space-y-1">
            <li>Professionalism and integrity</li>
            <li>Innovation with discipline</li>
            <li>Service-oriented partnership</li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <h3 className="text-xl font-semibold text-raven-dark mb-2">Team & Expertise</h3>
          <p className="text-gray-700">
            Deep experience across AWS, Azure, Kubernetes, Terraform, GitHub Actions, Jenkins, and modern data platforms. We build resilient delivery pipelines, observability, and secure cloud architectures.
          </p>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold text-raven-dark mb-2">Corporate Credentials</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Veteran-Owned Small Business (VOSB)</li>
            <li>DUNS / UEI / CAGE available upon request</li>
            <li>Partnership-ready for federal and enterprise engagements</li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h3 className="text-xl font-semibold text-raven-dark mb-2">Why Choose RAV DevOps</h3>
          <p className="text-gray-700">
            We combine military precision with modern software practices—delivering reliable outcomes, transparent communication, and measurable impact for mission-critical work.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;

