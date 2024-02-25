'use server';

import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { revalidatePath } from 'next/cache';

import { ATTRIBUTES_DIR } from "./lib/directories";
import { ROUTES } from '_constants/index';

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
  // const dir = path.join(process.cwd(), 'app/_features/attributes');
  // const dir = path.join(attributesDir, 'attributes');
  // console.log('ATTRIBUTES_DIR', ATTRIBUTES_DIR);
  const files = fs.readdirSync(ATTRIBUTES_DIR);
  // console.log('files', files);

  // read the content of each file
  const attributes = files.map(file => {
    const filePath = path.join(ATTRIBUTES_DIR, file);
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
  // const dir = path.join(process.cwd(), 'app/_features/attributes');
  const dir = ATTRIBUTES_DIR;
  const filePath = path.join(dir, `${attribute.name}.yml`);
  const content = yaml.stringify(attribute);
  fs.writeFileSync(filePath, content);

  revalidatePath(ROUTES.ATTRIBUTES);

  return {
    message: 'Attribute added successfully',
    status: true
  };
}

function editAttribute(attribute: Attribute, oldAttributeName: string) {
  if (!oldAttributeName) {
    return {
      message: 'oldAttributeName is required',
      status: false
    }
  }

  if (oldAttributeName === '') {
    return {
      message: 'oldAttributeName is required',
      status: false
    }
  }

  // const dir = path.join(process.cwd(), 'app/_features/attributes');
  const dir = ATTRIBUTES_DIR;
  const oldFilePath = path.join(dir, `${oldAttributeName}.yml`);
  fs.unlinkSync(oldFilePath); // delete the old file

  const newFilePath = path.join(dir, `${attribute.name}.yml`); // create a new file with the updated attribute name
  const content = yaml.stringify(attribute);
  fs.writeFileSync(newFilePath, content);

  revalidatePath(ROUTES.ATTRIBUTES);

  return {
    message: 'Attribute updated successfully',
    status: true
  }
}

function deleteAttribute(name: string) {
  // const dir = path.join(process.cwd(), 'app/_features/attributes');
  const dir = ATTRIBUTES_DIR;
  const filePath = path.join(dir, `${name}.yml`);
  fs.unlinkSync(filePath);

  revalidatePath(ROUTES.ATTRIBUTES);

  return name;
}