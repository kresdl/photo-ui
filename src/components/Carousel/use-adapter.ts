import { EnterState, ExitState } from './types';
import { MouseEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import useSwipe from './use-swipe';
import { useMounted, useOnUIEvent } from '../../lib/hooks';

type Static = {
    index: number;
    prev: number | null;
    task: number | null;
    busy: boolean;
    reverse: boolean;
    keys: [string, string];
    inView: boolean;
    time: number;
    refs: HTMLImageElement[];
}

const useAdapter = (images: string[], timeout: number, swipeTimeout: number, interval: number | null) => {
    if (interval && timeout > interval) throw Error('"timeout" cannot be bigger than "interval"');

    const [[enterState, exitState], setState] = useState<[EnterState | null, ExitState | null]>([null, null]);
    const mounted = useMounted()
    const { current: mem } = useRef<Partial<Static>>({})
    const urls = useMemo(() => images, [images.join('@')]);

    const offs = (offset: number) => (mem.index! + urls.length + offset) % urls.length;

    const check = (i?: number) =>
        mounted.current
        && mem.inView
        && !mem.busy
        && (typeof i === 'undefined' || i !== mem.index);

    const nav = (i: number, reverse = false, time = timeout) => {
        if (!check(i)) return;
        const [a, b] = mem.keys!;

        Object.assign(mem, {
            busy: true,
            reverse,
            index: i,
            prev: mem.index,
            keys: [b, a],
            time,
        });

        setState(reverse ? ['enter-left', 'exit-right'] : ['enter-right', 'exit-left']);

        setTimeout(() => {
            mem.busy = false;
            if (mounted.current) setState(['entered', 'exited']);
        }, time);
    };

    const fwd = (time = timeout) => {
        nav(offs(1), false, time)
    };

    const back = (time = timeout) => {
        nav(offs(-1), true, time);
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
            mem.task = window.setInterval(fwd, interval);
        }
    };

    const isInView = () => {
        const em = ref.current;
        if (!em) return false;
        const r = em.getBoundingClientRect();
        return (r.y < window.innerHeight && r.y + r.height > 0);
    };

    const click = (i: number, reverse: boolean, evt?: React.MouseEvent) => {
        if (evt) {
            evt.stopPropagation();
            evt.preventDefault();
        }
        cancel();
        nav(i, reverse);
    }

    const onFwd: MouseEventHandler = evt => click(offs(1), false, evt);
    const onBack: MouseEventHandler = evt => click(offs(-1), true, evt);
    const onJump = (i: number) => click(i, i < mem.index!);

    const onSwipe = ([x]: [Number, number]) => {
        if (!x) return;
        cancel();
        if (x > 0) back(swipeTimeout);
        else fwd(swipeTimeout);
    }

    const ref = useRef<HTMLDivElement>(null);

    useOnUIEvent(window, 'scroll', () => {
        let inView = isInView();
        if (inView && !mem.inView) schedule();
        if (!inView) cancel();
        mem.inView = inView;
    }, []);

    useEffect(() => {
        window.addEventListener('focus', schedule);
        window.addEventListener('blur', cancel);
        mem.inView = isInView();
        schedule();

        return () => {
            window.removeEventListener('focus', schedule);
            window.removeEventListener('blur', cancel);
            void cancel();
        }
    }, []);
    
    useEffect(() => {
        Object.assign(mem, {
            index: 0,
            prev: null,
            keys: ['x', 'y'],
        });

        setState(['entered', 'exited']);
    }, [urls]);

    useEffect(() => {
        if (typeof mem.prev === 'number') {
            setState(mem.reverse ? ['enter-left-active', 'exit-right-active'] : ['enter-right-active', 'exit-left-active'])
        }
    }, [mem.index]);

    useSwipe(ref, onSwipe);

    return {
        enterState, exitState, ref,
        onFwd, onBack, onJump,
        ...mem,
    };
};

export default useAdapter;
