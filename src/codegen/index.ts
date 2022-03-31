import dedent from "ts-dedent";

// Takes a Config input & returns a generated Prisma schema file as a string
// which can then be written to a file / formatted by Prisma CLI
export const generate = (config: Config): string => {
  config.blocks = config.blocks.map((model) => del(model, "Field"));

  return dedent`
    ${header(`refract - ${process.env.npm_package_version}`)}
    ${header("datasource")}
    ${block("database db", kv(config.datasource))}

    ${header("generators")}
    ${config.generators
      .map((generator) =>
        block(`generator ${generator.name}`, kv(del(generator, "name")))
      )
      .join("\n")}

    ${header("enums")}
    ${config.blocks
      .filter(isEnum)
      .map((e) =>
        block(`enum ${e.name}`, e.columns.map((c) => `\t${c.name}`).join(",\n"))
      )
      .join("\n\n")}

    ${header("models")}
    ${config.blocks
      .filter(isModel)
      .map((model) =>
        block(`model ${model.name}`, model.columns.map(column).join("\n"))
      )
      .join("\n\n")}
`;
};
