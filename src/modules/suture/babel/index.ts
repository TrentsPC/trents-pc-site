import { type NodePath, types as t } from "@babel/core";
import { PluginObj } from "@babel/core";

type PluginState = {};

function transformJSXAttribute(
  path: NodePath<t.JSXAttribute>,
  _callState: PluginState
) {
  const propName = path.node.name.name;
  if (propName !== "css") {
    return;
  }
  const propValue = path.get("value");
  if (propValue.type !== "JSXExpressionContainer") return;
  const expressionContainer =
    propValue as unknown as NodePath<t.JSXExpressionContainer>;
  const expression = expressionContainer.get("expression");
  if (expression.type !== "ObjectExpression") return;

  console.log(propName, path.node.loc?.start.line);
  path.remove();
}

export function sutureBabelPlugin(): PluginObj<{}> {
  return {
    name: "suture-babel",
    visitor: {
      // Program: {
      //   enter: preprocess,
      //   exit: postprocess,
      // },
      JSXAttribute: transformJSXAttribute,
    },
  };
}
