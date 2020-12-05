import { EnterState, ExitState } from './types';
import { MouseEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import useSwipe from './use-swipe';
import { useMounted, useOnUIEvent } from '../../lib/hooks';

type Static = {
    index: number | null;
    prev: number | null;
    task: number | null;
    busy: boolean;
    reverse: boolean;
    loadCount: number;
    url: string;
    oldUrl: string;
    promises: Promise<unknown>[];
    keys: [string, string];
    inView: boolean;
    time: number;
    op: number;
};

const useAdapter = (images: string[], timeout: number, swipeTimeout: number, interval: number | null) => {
    if (interval && timeout > interval) throw Error('"timeout" cannot be bigger than "interval"');

    const [[enterState, exitState], setState] = useState<[EnterState | null, ExitState | null]>([null, null]);
    const mounted = useMounted()
    const { current: mem } = useRef<Partial<Static>>({});
    const urls = useMemo(() => images, [images.join('@')]);

    const check = (i?: number) =>
        mounted.current
        && mem.inView
        && !mem.busy
        && (typeof i === 'undefined' || i !== mem.index);

    const go = (i: number, reverse = false, time = timeout) => {
        if (!check()) return;
        const [a, b] = mem.keys!;

        Object.assign(mem, {
            busy: true,
            reverse,
            index: i,
            prev: mem.index,
            url: urls[i],
            oldUrl: urls[mem.index!],
            keys: [b, a],
            time,
        });

        setState(reverse ? ['enter-left', 'exit-right'] : ['enter-right', 'exit-left']);

        setTimeout(() => {
            mem.busy = false;
            if (!check()) return;
            setState(['entered', 'exited']);
        }, time);
    };

    const wait = async (i: number) => {
        if (i < mem.loadCount!) return true;
        cancel();
        const op = mem.op;
        await mem.promises![i];
        if (op !==  mem.op || !check()) return false;
        schedule();
        return true;
    };

    const nav = async (i: number, reverse = false, time = timeout) => {
        mem.op = Date.now();
        if (!check(i)) return;
        const idle = await wait(i);
        idle && go(i, reverse, time);
    };

    const next = () => {
        nav((mem.index! + 1) % urls.length)
    }

    const fwd = (time = timeout) => {
        nav((mem.index! + 1) % urls.length, false, time)
        schedule();
    };

    const back = (time = timeout) => {
        const { length } = urls;
        nav((mem.index! + length - 1) % length, true, time);
        schedule();
    };

    const jump = (i: number) => {
        nav(i, i < mem.index!);
        schedule();
    };

    const cancel = () => {
        if (mem.task) {
            clearInterval(mem.task);
            mem.task = null;
        }
    };

    const schedule = () => {
        cancel();
        if (interval) {
            mem.task = setInterval(next, interval);
        }
    };

    const isInView = () => {
        const em = ref.current;
        if (!em) return false;
        const r = em.getBoundingClientRect();
        return (r.y < window.innerHeight && r.y + r.height > 0);
    };

    const onFwd: MouseEventHandler = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        fwd();
    }

    const onBack: MouseEventHandler = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        back();
    }

    const onSwipe = ([x]: [Number, number]) => {
        if (!x) return;
        if (x > 0) back(swipeTimeout);
        else fwd(swipeTimeout);
    }

    const ref = useRef<HTMLDivElement>(null);
    
    useOnUIEvent(window, 'scroll', () => {
        let inView = isInView();
        if (inView && !mem.inView) schedule();
        if (!inView) cancel();
        mem.inView = inView;
    }, false, []);

    useEffect(() => () => void cancel(), []);
    
    useEffect(() => {
        const countLoaded = async (i = 0) => {
            await mem.promises![i];
            if (!mounted.current) return;

            mem.loadCount = i + 1;
            if (mem.loadCount === 1) {
                mem.inView = isInView();
                mem.index = 0;
                setState(['entered', 'exited']);
                mem.inView && schedule();
            }
            if (i < urls.length - 1) countLoaded(i + 1);
        };
    
        cancel();

        Object.assign(mem, {
            promises: urls.map((url) => new Promise<void>((res) => {
                const img = new Image();
                img.onload = res as any;
                img.src = url;
            })),
            loadCount: 0,
            index: null,
            prev: null,
            url: urls[0],
            oldUrl: undefined,
            keys: ['x', 'y'],  
        });

        countLoaded();
    }, [urls]);

    useEffect(() => {
        if (typeof mem.index === 'number') {
            setState(mem.reverse ? ['enter-left-active', 'exit-right-active'] : ['enter-right-active', 'exit-left-active'])
        }
    }, [mem.index]);

    useSwipe(ref, onSwipe);

    return {
        enterState, exitState, ref,
        onFwd, onBack, onJump: jump,
        width: ref.current?.clientWidth,
        index: mem.index,
        url: mem.url,
        oldUrl: mem.oldUrl,
        time: mem.time,
        prev: mem.prev,
        keys: mem.keys,
    };
};

export default useAdapter;
