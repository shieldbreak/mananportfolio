import { motion } from "framer-motion";

const experiences = [
  {
    title: "EVENT COORDINATOR",
    company: "Film and Media Council",
    period: "Sep 2023 - Nov 2023",
    description: "Led a team of 25+ students for publicity and management for this Event and ciently Coordinated the Event Realm of Wonders at FMC Weekend, overseeing 50+ participants from across India and managing all aspects to ensure smooth execution and High engagement."
  },
  {
    title: "ANIMATION EXECUTIVE",
    company: "Film and Media Council",
    period: "Nov 2023 - Oct 2023",
    description: "Create and manage social media content to Enhance Audience Engagement and Elevate Council reach and Lead Effective teamwork and collaborate closely with Club members."
  }
];

const education = [
  {
    degree: "Intermediate degree",
    institution: "Saiyyid Hamid Senior Secondary School (Boys)",
    period: "2020 - 2021",
    description: "Persued PCM for Engineering Field"
  },
  {
    degree: "B.Tech in Electronics Engineering",
    institution: "IIT BHU",
    period: "2022 - 2026",
    description: "Specialized in Problem solving. Explored field of web Development, Machine learning and Data Analytics"
  }
];

const certifications = [
  { name: "AWS Certified Data Analytics Specialty", year: "2022" },
  { name: "Certified Kubernetes Administrator", year: "2021" },
  { name: "Google Professional Data Engineer", year: "2020" },
  { name: "Azure DevOps Engineer Expert", year: "2019" }
];

export default function ResumeSection() {
  return (
    <section id="resume" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-3xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Resume Overview
        </motion.h2>

        <motion.div
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-6 md:p-8">
            {/* Experience */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-briefcase text-primary dark:text-blue-400 mr-3"></i>
                POSITION OF RESPONSIBILITY
              </h3>

              {experiences.map((experience, index) => (
                <motion.div
                  key={index}
                  className="mb-6 border-l-4 border-primary dark:border-blue-600 pl-5 pb-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold">{experience.title}</h4>
                    <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300">
                      {experience.period}
                    </span>
                  </div>
                  <h5 className="text-lg text-gray-600 dark:text-gray-400 mb-3">{experience.company}</h5>
                  <p className="text-gray-600 dark:text-gray-300">
                    {experience.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-graduation-cap text-primary dark:text-blue-400 mr-3"></i>
                Education
              </h3>

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="mb-6 border-l-4 border-primary dark:border-blue-600 pl-5 pb-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold">{edu.degree}</h4>
                    <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300">
                      {edu.period}
                    </span>
                  </div>
                  <h5 className="text-lg text-gray-600 dark:text-gray-400 mb-3">{edu.institution}</h5>
                  <p className="text-gray-600 dark:text-gray-300">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Certifications
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-certificate text-primary dark:text-blue-400 mr-3"></i>
                Certifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <i className="fas fa-award text-secondary dark:text-green-400 text-xl mr-3"></i>
                    <div>
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{cert.year}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div> */}

            {/* Download Resume */}
            <div className="text-center">
              <motion.a
                href="https://drive.google.com/file/d/12xoh9qwohkIv4CcSWVtPFCzQ7LkhSkiW/view?usp=sharing"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-download mr-2"></i> Download Full Resume
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
