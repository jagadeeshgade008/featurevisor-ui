'use server';

import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

import { Attribute } from '_types';

export {
  getAttributes,
  addAttribute,
  editAttribute,
  deleteAttribute,
}

function getAttributes() {
  // app/_features/attributes
  // read the all the yml files in _features/attributes folder
  const dir = path.join(process.cwd(), 'app/_features/attributes');
  const files = fs.readdirSync(dir);
  console.log('files', files);

  // read the content of each file
  const attributes = files.map(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const attribute = yaml.parse(content);
    return {
      ...attribute,
      name: file.replace(/\.yml$/, '')
    };
  }
  );

  return attributes;
}

function addAttribute(attribute: Attribute) {
  const dir = path.join(process.cwd(), 'app/_features/attributes');
  const filePath = path.join(dir, `${attribute.name}.yml`);
  const content = yaml.stringify(attribute);
  fs.writeFileSync(filePath, content);
  return attribute;
}

function editAttribute(attribute: Attribute) {
  const dir = path.join(process.cwd(), 'app/_features/attributes');
  const filePath = path.join(dir, `${attribute.name}.yml`);
  const content = yaml.stringify(attribute);
  fs.writeFileSync(filePath, content);
  return attribute;
}

function deleteAttribute(name: string) {
  const dir = path.join(process.cwd(), 'app/_features/attributes');
  const filePath = path.join(dir, `${name}.yml`);
  fs.unlinkSync(filePath);
  return name;
}