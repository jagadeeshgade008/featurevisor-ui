'use server';

import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { revalidatePath } from 'next/cache';

import { SEGMENTS_DIR } from "./lib/directories";
import { ROUTES } from '_constants/index';

import { Segment } from '_types';

export {
    getSegments,
    addSegment,
    editSegment,
    deleteSegment,
}

function getSegments() {
    const files = fs.readdirSync(SEGMENTS_DIR);

    const segments = files.map(file => {
        const filePath = path.join(SEGMENTS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');

        const segment = yaml.parse(content);
        return {
            ...segment,
            name: file.replace(/\.yml$/, '')
        };
    }
    )
    return segments;
}

function addSegment(segment: Segment) {
    const dir = SEGMENTS_DIR;
    const filePath = path.join(dir, `${segment.name}.yml`);
    const content = yaml.stringify(segment);
    fs.writeFileSync
        (filePath, content);

    revalidatePath(ROUTES.SEGMENTS);

    return {
        message: 'Segment added successfully',
        status: true
    };
}

function editSegment(segment: Segment, oldSegmentName: string) {
    if (!oldSegmentName) {
        return {
            message: 'Old segment name is required',
            status: false
        };
    }
    const dir = SEGMENTS_DIR;
    const filePath = path.join(dir, `${oldSegmentName}.yml`);
    const content = yaml.stringify(segment);
    fs.writeFileSync(filePath, content);

    revalidatePath(ROUTES.SEGMENTS);

    return {
        message: 'Segment updated successfully',
        status: true
    };
}

function deleteSegment(name: string) {
    const dir = SEGMENTS_DIR;
    const filePath = path.join(dir, `${name}.yml`);
    fs.unlinkSync(filePath);

    revalidatePath(ROUTES.SEGMENTS);

    return {
        message: 'Segment deleted successfully',
        status: true
    };

}