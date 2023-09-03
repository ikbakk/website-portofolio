export default {
  name: "featured",
  type: "document",
  title: "Featured",
  fields: [
    {
      name: "featured",
      type: "array",
      title: "Featured Project",
      of: [
        {
          type: "reference",
          to: { type: "projects" },
        },
      ],
    },
  ],
};
