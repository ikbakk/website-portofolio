export default {
  name: "projects",
  type: "document",
  title: "Projects",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "code", type: "string", title: "Code" },
    { name: "demo", type: "string", title: "Live Demo" },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 25,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },

    { name: "overview", type: "string", title: "Overview" },
    { name: "image", type: "image", title: "Image" },
    {
      name: "tech",
      type: "array",
      title: "Tech Used",
      of: [
        {
          type: "reference",
          to: { type: "techs" },
        },
      ],
    },
    {
      name: "description",
      type: "array",
      title: "Description",
      of: [{ type: "block" }],
    },
  ],
};
