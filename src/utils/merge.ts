function isMergeableObject(value: any) {
  return isNonNullObject(value) && !isSpecial(value);
}

function isNonNullObject(value: any) {
  return !!value && typeof value === "object";
}

function isSpecial(value: any) {
  var stringValue = Object.prototype.toString.call(value);

  return (
    stringValue === "[object RegExp]" ||
    stringValue === "[object Date]" ||
    isReactElement(value)
  );
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 0xeac7;

function isReactElement(value: any) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val: any) {
  return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value: any) {
  return isMergeableObject(value) ? merge(emptyTarget(value), value) : value;
}

function arrayMerge(target: any, source: any) {
  const destination = target.slice();

  source.forEach((item: any, index: any) => {
    if (typeof destination[index] === "undefined") {
      destination[index] = cloneUnlessOtherwiseSpecified(item);
    } else if (isMergeableObject(item)) {
      destination[index] = merge(target[index], item);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });
  return destination;
}

function getMergeFunction() {
  return merge;
}

function getEnumerableOwnPropertySymbols(target: any): any {
  return Object.getOwnPropertySymbols
    ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      })
    : [];
}

function getKeys(target: any) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}

function propertyIsOnObject(object: any, property: any) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target: any, key: any) {
  return (
    propertyIsOnObject(target, key) && // Properties are safe to merge if they don't exist in the target yet,
    !(
      Object.hasOwnProperty.call(target, key) && // unsafe if they exist up the prototype chain,
      Object.propertyIsEnumerable.call(target, key)
    )
  ); // and also unsafe if they're nonenumerable.
}

function mergeObject(target: any, source: any) {
  var destination: any = {};
  if (isMergeableObject(target)) {
    getKeys(target).forEach(function (key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key]);
    });
  }
  getKeys(source).forEach(function (key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }

    if (propertyIsOnObject(target, key) && isMergeableObject(source[key])) {
      destination[key] = getMergeFunction()(target[key], source[key]);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key]);
    }
  });
  return destination;
}

export function merge<T>(x: Partial<T>, y: Partial<T>): T;
export function merge<T1, T2>(x: Partial<T1>, y: Partial<T2>): T1 & T2;
export function merge(target: any, source: any) {
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source);
  } else if (sourceIsArray) {
    return arrayMerge(target, source);
  } else {
    return mergeObject(target, source);
  }
}
