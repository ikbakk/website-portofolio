export function SkillsPane() {
  return (
    <>
      <div className="border-l-4 border-accent pl-4">
        <div className="text-accent font-bold text-lg tracking-wider">$ cat skills.sh</div>
      </div>

      <div className="space-y-4">
        {[
          {
            category: "Frontend",
            items: ["React", "Next.js", "TypeScript", "TailwindCSS", "Vue.js"],
          },
          {
            category: "Backend",
            items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"],
          },
          {
            category: "DevOps & Tools",
            items: ["Docker", "Git", "CI/CD", "AWS", "Vercel"],
          },
          {
            category: "Databases",
            items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
          },
        ].map((skillGroup, i) => (
          <div key={i}>
            <div className="text-accent font-mono text-sm font-bold">{skillGroup.category}</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {skillGroup.items.map((skill) => (
                <div key={skill} className="border-l-2 border-accent pl-2 text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
