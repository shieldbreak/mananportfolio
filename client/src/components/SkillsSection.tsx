import { motion } from "framer-motion";

const dataSkills = [
  { name: "SQL & NoSQL Databases", level: 85 },
  { name: "C/C++", level: 90 },
  { name: "Data Analytics", level: 80 },
  { name: "Mern-stack", level: 40 },
  { name: "Machine learning", level: 60 }
];

const devopsSkills = [
  { name: "CI/CD Pipelines", level: 90 },
  { name: "Container Orchestration", level: 85 },
  { name: "Infrastructure as Code", level: 80 },
  { name: "Cloud Platforms", level: 85 },
  { name: "Monitoring & Observability", level: 75 }
];
const technologies = [
  { name: "Python", icon: "fab fa-python" }, // ✅ Correct
  { name: "SQL", icon: "fas fa-database" }, // ✅ Correct
  { name: "JavaScript", icon: "fab fa-js" }, // ✅ Correct
  { name: "Pandas", icon: "fas fa-chart-bar" }, // 🔄 Using chart icon (or alternative)
  { name: "React", icon: "fab fa-react" }, // ✅ Correct
  { name: "GitHub", icon: "fab fa-github" } // ✅ Correct
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 px-6">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Technical Skills
        </motion.h2>

        <div className="flex justify-center w-full">
          {/* Data Engineering Skills */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-300 w-full max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <i className="fas fa-database text-primary dark:text-blue-400 text-2xl"></i>
                </div>
                <h3 className="text-3xl font-bold">Data Engineering</h3>
              </div>

              {dataSkills.map((skill, index) => (
                <div className="mb-5 last:mb-0" key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="bg-primary dark:bg-blue-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>


        {/* Technologies */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">Technologies I Work With</h3>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center transition-transform hover:scale-110 duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <i className={`${tech.icon} text-4xl text-primary dark:text-blue-400 mb-2`}></i>
                <span className="text-center font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
