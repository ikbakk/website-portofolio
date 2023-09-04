export default {
  name: "skillsets",
  type: "document",
  title: "Skillsets",
  fields: [
    { name: "title", type: "string", title: "Skillset title" },
    {
      name: "techs",
      type: "array",
      title: "Technologies",
      of: [
        {
          type: "reference",
          to: { type: "techs" },
        },
      ],
    },
  ],
};
