import React, { useState } from 'react';

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
    // Yahan pt-24 kiya hai taaki text navbar se thoda niche aur balanced lage (jaisa 2nd image mein hai)
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center w-full max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      
      <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-white">Get In Touch</h2>
      <p className="text-gray-400 mb-6 text-sm sm:text-base text-center">Have a project in mind? Let's talk.</p>
      
      <form onSubmit={handleContactSubmit} className="w-full space-y-3 sm:space-y-4">
        <input type="text" name="name" placeholder="Name" required className="w-full p-3.5 rounded-lg bg-gray-800/80 border border-gray-700 text-white text-sm sm:text-base outline-none focus:border-[#2563EB] transition-colors" />
        <input type="email" name="email" placeholder="Email" required className="w-full p-3.5 rounded-lg bg-gray-800/80 border border-gray-700 text-white text-sm sm:text-base outline-none focus:border-[#2563EB] transition-colors" />
        <textarea name="message" placeholder="Message" rows="4" required className="w-full p-3.5 rounded-lg bg-gray-800/80 border border-gray-700 text-white text-sm sm:text-base outline-none focus:border-[#2563EB] transition-colors resize-none"></textarea>
        
        {/* Send Message Button */}
        <div className="flex justify-center pt-1">
          <button type="submit" className="w-full sm:w-auto bg-[#2563EB] hover:bg-blue-700 px-10 py-3 rounded-lg transition text-white font-medium text-sm sm:text-base shadow-lg">
            Send Message
          </button>
        </div>

        {formStatus && <p className="text-green-400 font-semibold mt-2 text-center text-sm sm:text-base">{formStatus}</p>}
      </form>
      
      {/* Social Icons - Button ke theek niche */}
      <div className="mt-6 flex justify-center space-x-6 text-xl text-gray-400">
        <a href="https://www.linkedin.com/in/umshthakurr/" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition transform hover:scale-110"><i className="fab fa-linkedin"></i></a>
        <a href="https://github.com/Umeshh-Dev" target="_blank" rel="noreferrer" className="hover:text-white transition transform hover:scale-110"><i className="fab fa-github"></i></a>
        <a href="https://x.com/Umesh__thakur0" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition transform hover:scale-110"><i className="fab fa-twitter"></i></a>
      </div>

    </section>
  );
}