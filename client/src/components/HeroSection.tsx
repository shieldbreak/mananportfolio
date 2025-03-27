import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="about" className="pt-32 pb-20 md:pt-36 md:pb-28 px-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div 
          className="order-2 md:order-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm <span className="text-primary dark:text-blue-400">John Doe</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-6">
            Data Engineer & DevOps Specialist
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            I transform complex data challenges into efficient, scalable solutions. With expertise in both Data Engineering and DevOps, I bridge the gap between data systems and operational excellence.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#contact" 
              className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center"
            >
              <i className="fas fa-paper-plane mr-2"></i> Contact Me
            </a>
            <a 
              href="#resume" 
              className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg transition-colors inline-flex items-center"
            >
              <i className="fas fa-file-alt mr-2"></i> View Resume
            </a>
          </div>
        </motion.div>
        <motion.div 
          className="order-1 md:order-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="John Doe" 
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div 
              className="absolute -bottom-5 -right-5 bg-secondary text-white rounded-full p-4 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <i className="fas fa-terminal text-2xl"></i>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
