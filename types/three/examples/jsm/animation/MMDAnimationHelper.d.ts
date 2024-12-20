import { AnimationClip, AnimationMixer, Audio, Bone, Camera, Mesh, Object3D, Quaternion, SkinnedMesh } from "three";

import { CCDIKSolver } from "./CCDIKSolver.js";
import { MMDPhysics } from "./MMDPhysics.js";

export interface MMDAnimationHelperParameter {
    sync?: boolean | undefined;
    afterglow?: number | undefined;
    resetPhysicsOnLoop?: boolean | undefined;
    pmxAnimation?: boolean | undefined;
}

export interface MMDAnimationHelperAddParameter {
    animation?: AnimationClip | AnimationClip[] | undefined;
    physics?: boolean | undefined;
    warmup?: number | undefined;
    unitStep?: number | undefined;
    maxStepNum?: number | undefined;
    gravity?: number | undefined;
    delayTime?: number | undefined;
}

export interface MMDAnimationHelperPoseParameter {
    resetPose?: boolean | undefined;
    ik?: boolean | undefined;
    grant?: boolean | undefined;
}

export interface MMDAnimationHelperMixer {
    looped: boolean;
    mixer?: AnimationMixer | undefined;
    ikSolver: CCDIKSolver;
    grantSolver: GrantSolver;
    physics?: MMDPhysics | undefined;
    duration?: number | undefined;
}

/**
 * @deprecated The module has been deprecated and will be removed with r172. Please migrate to
 * https://github.com/takahirox/three-mmd-loader instead.
 */
export class MMDAnimationHelper {
    constructor(params?: MMDAnimationHelperParameter);
    meshes: SkinnedMesh[];
    camera: Camera | null;
    cameraTarget: Object3D;
    audio: Audio;
    audioManager: AudioManager;
    configuration: {
        sync: boolean;
        afterglow: number;
        resetPhysicsOnLoop: boolean;
        pmxAnimation: boolean;
    };
    enabled: {
        animation: boolean;
        ik: boolean;
        grant: boolean;
        physics: boolean;
        cameraAnimation: boolean;
    };
    objects: WeakMap<SkinnedMesh | Camera | AudioManager, MMDAnimationHelperMixer>;
    onBeforePhysics: (mesh: SkinnedMesh) => void;
    sharedPhysics: boolean;
    masterPhysics: null;

    add(object: SkinnedMesh | Camera | Audio, params?: MMDAnimationHelperAddParameter): this;
    remove(object: SkinnedMesh | Camera | Audio): this;
    update(delta: number): this;
    pose(mesh: SkinnedMesh, vpd: object, params?: MMDAnimationHelperPoseParameter): this;
    enable(key: string, enabled: boolean): this;
    createGrantSolver(mesh: SkinnedMesh): GrantSolver;
}

export interface AudioManagerParameter {
    delayTime?: number | undefined;
}

export class AudioManager {
    constructor(audio: Audio, params?: AudioManagerParameter);
    audio: Audio;
    elapsedTime: number;
    currentTime: number;
    delayTime: number;
    audioDuration: number;
    duration: number;

    control(delta: number): this;
}

export class GrantSolver {
    constructor(mesh: SkinnedMesh, grants: object[]);
    mesh: SkinnedMesh;
    grants: object[];

    update(): this;
    updateOne(gran: object[]): this;
    addGrantRotation(bone: Bone, q: Quaternion, ratio: number): this;
}
