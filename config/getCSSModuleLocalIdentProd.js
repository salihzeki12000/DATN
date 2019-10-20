/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

const loaderUtils = require("loader-utils");

module.exports = function getLocalIdent(
  context,
  localIdentName,
  localName,
  options
) {
  // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
  const fileNameOrFolder = context.resourcePath.match(
    /index\.module\.(css|scss|sass)$/
  )
    ? "[folder]"
    : "[name]";
  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
  const hash = loaderUtils.getHashDigest(
    context.resourcePath + localName,
    "md5",
    "base64",
    10
  );
  // Use loaderUtils to find the file or folder name
  const className = loaderUtils.interpolateName(context, "_" + hash, options);
  // remove the .module that appears in every classname when based on the file.
  return className.replace(".module_", "_");
};
