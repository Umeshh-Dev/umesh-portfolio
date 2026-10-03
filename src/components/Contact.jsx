import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('⏳ Sending...');
    const formData = new FormData(e.target);
    const res = await fetch("https://formspree.io/f/xlgzapzn", { method: "POST", body: formData, headers: { 'Accept': 'application/json' } });
    if (res.ok) { setFormStatus('✅ Message Sent Successfully!'); e.target.reset(); }
    else setFormStatus('❌ Failed to send message!');
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center w-full max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-white">Get In Touch</h2>
        <div className="h-1 w-20 bg-[#2563EB] mx-auto rounded-full mb-4"></div>
        <p className="text-gray-400 text-sm sm:text-base">Have a project in mind? Let's talk.</p>
      </motion.div>
      
      <motion.form 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        onSubmit={handleContactSubmit} 
        className="w-full space-y-4"
      >
        <motion.div whileFocus={{ scale: 1.01 }} className="w-full">
          <input type="text" name="name" placeholder="Name" required className="w-full p-4 rounded-xl bg-gray-800/80 border border-gray-700 text-white text-sm sm:text-base outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all shadow-sm" />
        </motion.div>
        <motion.div whileFocus={{ scale: 1.01 }} className="w-full">
          <input type="email" name="email" placeholder="Email" required className="w-full p-4 rounded-xl bg-gray-800/80 border border-gray-700 text-white text-sm sm:text-base outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all shadow-sm" />
        </motion.div>
        <motion.div whileFocus={{ scale: 1.01 }} className="w-full">
          <textarea name="message" placeholder="Message" rows="5" required className="w-full p-4 rounded-xl bg-gray-800/80 border border-gray-700 text-white text-sm sm:text-base outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all resize-none shadow-sm"></textarea>
        </motion.div>
        
        <div className="flex justify-center pt-2">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="w-full sm:w-auto bg-[#2563EB] hover:bg-blue-600 px-10 py-3.5 rounded-xl transition-colors text-white font-semibold text-sm sm:text-base shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
          >
            Send Message
          </motion.button>
        </div>

        {formStatus && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 font-semibold mt-4 text-center text-sm sm:text-base bg-green-500/10 py-2 rounded-lg">
            {formStatus}
          </motion.p>
        )}
      </motion.form>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10 flex justify-center space-x-8 text-2xl text-gray-400"
      >
        <motion.a whileHover={{ y: -5, color: "#2563EB" }} href="https://www.linkedin.com/in/umshthakurr/" target="_blank" rel="noreferrer" className="transition-colors"><i className="fab fa-linkedin"></i></motion.a>
        <motion.a whileHover={{ y: -5, color: "#ffffff" }} href="https://github.com/Umeshh-Dev" target="_blank" rel="noreferrer" className="transition-colors"><i className="fab fa-github"></i></motion.a>
        <motion.a whileHover={{ y: -5, color: "#1DA1F2" }} href="https://x.com/Umesh__thakur0" target="_blank" rel="noreferrer" className="transition-colors"><i className="fab fa-twitter"></i></motion.a>
      </motion.div>

    </section>
  );
}