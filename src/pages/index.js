import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useInView } from 'react-intersection-observer';
import { useRef, useEffect, useState, useCallback } from "react";
import * as Icon from "phosphor-react";
import {
    DndContext,
    closestCenter,
    DragOverlay,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    PointerSensor,
    KeyboardSensor,
    sortableKeyboardCoordinates,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/layout/SortableItem";
import Confetti from 'react-dom-confetti';
import RiveComponent from '@rive-app/react-canvas';

export default function Home() {
    const cursor = useRef(null);
    const [customCursor, setCustomCursor] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [confetti, setConfetti] = useState(false);
    const [items, setItems] = useState([
        {
            id: "1",
        },
        {
            id: "2",
        },
    ]);
    const [activeId, setActiveId] = useState(null);
    const router = useRouter();

    const handleMouseMove = (e) => {
        requestAnimationFrame(() => {
            cursor.current.style.left = e.clientX + "px";
            cursor.current.style.top = e.clientY + "px";
        });
    };

    const config = {
        angle: 90,
        spread: "61",
        startVelocity: "30",
        elementCount: "40",
        dragFriction: 0.12,
        duration: 3000,
        stagger: "4",
        width: "10px",
        height: "10px",
        perspective: "359px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };

    useEffect(() => {
        if (customCursor) {
            document.addEventListener("mousemove", handleMouseMove);
            return () => document.removeEventListener("mousemove", handleMouseMove);
        }
    }, [customCursor]);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                tolerance: 5,
                delay: 150,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                tolerance: 5,
                delay: 150,
            },
        })
    );

    const handleDragStart = useCallback((event) => {
        setActiveId(event.active.id);
    }, []);

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }, []);

    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);

    const handleDragOver = useCallback((event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });

        }
    }, []);

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '200px',
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            setIsInView(true);
        }
    }, [inView]);

    return (
        <>
            <Head>
                <title>Bridge - Effiecient hiring process with joy</title>
                <meta
                    name="description"
                    content="Bridge is a tool that allows you to create interactive elements for your website."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    property="og:title"
                    content="Bridge is a tool that allows you to create interactive elements for your website."
                />
                <meta
                    property="og:description"
                    content="Bridge is a tool that allows you to create interactive elements for your website."
                />
                <meta
                    property="og:image"
                    content="/images/bridge_opengraph.jpg"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@floriandwt" />
                <meta name="twitter:title" content="Florian Portfolio" />
                <meta
                    name="twitter:image"
                    content="/images/bridge_twitter.jpg"
                />
                <meta
                    name="twitter:description"
                    content="Bridge is a tool that allows you to create interactive elements for your website."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="max-md:w-[90%] w-full max-w-7xl pl-[5%] pr-[5%] flex justify-between py-4 items-center fixed translate-x-[-50%] left-[50%] z-50">
                <Image
                    alt="Bridge Logo"
                    src="/images/general/logo.svg"
                    width={56}
                    height={40}
                    className="cursor-pointer"
                />
                <div className="flex gap-8">
                    <button className="font-semibold" onClick={() => {
                        router.push('/login')
                    }}>Login</button>
                    <button className="font-medium px-4 py-2 bg-black text-white rounded-lg">
                        Try for free
                    </button>
                </div>
            </div>
            <main className="h-full w-full bg-white">
                <div className="max-md:w-[90%] w-full max-w-7xl pl-[5%] pr-[5%] m-auto min-h-[200vh] bg-white">
                    <div
                        className="min-h-64 md:pt-48 max-md:pt-40 relative z-20 border-b border-b-neutral-200"

                    >
                        <div className="max-w-3xl flex flex-col gap-6 md:mb-20">
                            <h1 className="font-semibold md:text-5xl max-md:text-3xl leading-tight">
                                Streamline your hiring process
                                with an interactive tool.
                            </h1>
                            <p className="text-gray-500 font-medium md:text-3xl max-md:text-xl leading-tight">
                                Create a high-quality candidate experience and find
                                the best talent for your business with Bridge.
                            </p>
                        </div>
                        <div className="flex justify-between relative left-[50%] translate-x-[-50%] w-screen overflow-hidden max-md:py-48 md:py-10 pl-[5%] pr-[5%] items-center md:cursor-none" onMouseEnter={() => setCustomCursor(true)}
                            onMouseLeave={() => setCustomCursor(false)}>
                            <div className="bg-slate-900 text-slate-100 text-xl px-7 py-5 rounded-2xl -rotate-2 relative xl:left-32 max-xl:left-10 -top-6 max-md:hidden">
                                <code className="font-mono">
                                    <pre>
                                        &#91;
                                        &#123;
                                        <br />
                                        &quot;id&quot;: 1,<br />
                                        &quot;content&quot;: [<br />
                                        &#123;<br />
                                        &quot;content&quot;: &quot;Product Designer!&quot;,<br />
                                        &quot;type&quot;: &quot;heading&quot;<br />
                                        &#125;,<br />
                                        &#123;<br />
                                        &quot;text&quot;: &quot;We need you!&quot;,<br />
                                        &quot;type&quot;: &quot;text&quot;<br />
                                        &#125;
                                        ]<br />
                                        &#125;,
                                    </pre>
                                </code>
                            </div>
                            <div className="py-4 px-8 bg-white z-20 shadow-2xl rounded-2xl ring-1 ring-neutral-200 top-24 absolute left-[50%] translate-x-[-50%] w-[90%] md:max-w-4xl flex justify-between max-lg:flex-col gap-10 transition-all duration-500 md:hover:scale-[1.01]">
                                <div className="h-96" />
                            </div>
                            <div className="bg-neutral-50 ring-1 ring-neutral-200 text-slate-100 text-xl px-7 py-4 rounded-2xl rotate-2 relative xl:right-32 max-xl:right-32 -top-16 max-md:hidden">
                                <div className="p-4 rounded-full h-56 w-56 bg-gradient-to-r from-violet-500 to-purple-400 flex justify-center items-center">
                                    <div className="bg-white rounded-full h-44 w-44 p-4 flex justify-center items-center flex-col gap-1">
                                        <p className="font-bold text-5xl text-purple-900">100</p>
                                        <p className="text-purple-900 font-medium">Clicks</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[url('/images/general/morph_lines.svg')] bg-top bg-no-repeat w-full max-md:h-96 md:h-[768px] absolute top-64 pointer-events-none left-[50%] translate-x-[-50%]">
                        <div className="bg-gradient-to-t from-white via-30% via-transparent to-white absolute z-10 top-0 left-0 right-0 bottom-0" />
                    </div>
                    <div className="min-h-64 pt-24">
                        <div className="w-full flex justify-center flex-col md:items-center gap-3 mb-16">
                            <h2 className="font-semibold md:text-4xl max-md:text-2xl text-black flex gap-4 items-center">Features that&apos;ll make you <Icon.FastForward weight="fill" className="text-violet-900" /></h2>
                            <p className="text-gray-500 text-xl font-medium">Built around users and their needs</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                            <div className="flex flex-col gap-3 p-6 bg-neutral-50 rounded-2xl overflow-hidden relative h-96">
                                <h3 className="text-black font-semibold md:text-2xl max-md:text-xl">Drag and Drop</h3>
                                <div className="flex flex-col gap-8 items-start bg-white left-8 p-8 absolute right-4 bottom-4 pr-8 ring-1 top-[30%] ring-neutral-200 rounded-2xl pb-8">
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragStart={handleDragStart}
                                        onDragEnd={handleDragEnd}
                                        onDragCancel={handleDragCancel}
                                        onDragOver={handleDragOver}
                                    >
                                        <SortableContext items={items} strategy={verticalListSortingStrategy}>
                                            {items.map((item, index) => {
                                                return (
                                                    <SortableItem
                                                        key={index}
                                                        id={item.id}
                                                        index={index}
                                                        items={item}
                                                        setItems={setItems}
                                                        landingpage="true"
                                                    />
                                                );
                                            })}
                                        </SortableContext>
                                    </DndContext>
                                </div>
                            </div>
                            <div className="flex flex-col md:col-span-2 gap-3 p-6 bg-neutral-50 rounded-2xl overflow-hidden relative h-96">
                                <h3 className="text-black font-semibold md:text-2xl max-md:text-xl">Made for the future</h3>
                                <div className="absolute left-16 top-[60%] translate-y-[-50%] h-48 w-full bg-no-repeat bg-right-center bg-[url('/images/general/privacy_badges.svg')]">
                                    <div className="absolute z-10 bg-gradient-to-r from-transparent to-neutral-100 top-0 bottom-0 left-0 right-0" />
                                </div>
                            </div>
                            <div className="flex flex-col md:col-span-2 gap-3 p-6 bg-neutral-50 rounded-2xl overflow-hidden h-96">
                                <h3 className="text-black font-semibold md:text-2xl max-md:text-xl flex gap-4 items-center">Connect with canditates
                                    {/* <span className="rounded-full ring-2 ring-purple-300 text-purple-500 text-sm px-2 py-1">Soon</span> */}
                                </h3>
                                <div className="w-full flex justify-between h-full items-center gap-4">
                                    <Image src="/images/general/memoji_1.jpg" alt="Daniel" width={128} height={128} className="rounded-full transition-all hover:scale-105 hover:shadow-xl ring-1 ring-purple-300" unoptimized={true} />
                                    <Icon.Link size={40} weight="fill" className="text-gray-500 max-md:hidden" />
                                    <Image src="/images/general/memoji_2.jpg" alt="Isabelle" width={128} height={128} className="rounded-full transition-all hover:scale-105 hover:shadow-xl ring-1 ring-pink-300" unoptimized={true} />
                                    <Icon.Link size={40} weight="fill" className="text-gray-500 max-md:hidden" />
                                    <Image src="/images/general/memoji_3.jpg" alt="Nataly" width={128} height={128} className="rounded-full transition-all hover:scale-105 hover:shadow-xl ring-1 ring-green-300" unoptimized={true} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 p-6 bg-neutral-50 rounded-2xl overflow-hidden h-96">
                                <h3 className="text-black font-semibold md:text-2xl max-md:text-xl">Publishing made easy</h3>
                                <div className="h-full w-full flex justify-center items-center">
                                    <button onClick={() => {
                                        setConfetti(true)
                                        setTimeout(() => {
                                            setConfetti(false)
                                        }, 3000)
                                    }} className="relative font-medium text-xl px-4 py-3 rounded-lg bg-black text-white transition-all hover:bg-zinc-800 flex gap-3 items-center">
                                        <Icon.UploadSimple size={28} weight="bold" />
                                        Publish
                                        <div className="absolute w-0 left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%]"><Confetti active={confetti} config={config} /></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-40 pb-40">
                        <div className="flex flex-col gap-3 mb-10">
                            <h2 className="font-semibold md:text-4xl max-md:text-2xl text-black flex gap-4 items-center">An intuitive Editor </h2>
                            <p className="text-gray-500 text-xl font-medium">Our editor works for everyone.</p>
                        </div>
                        {isInView ? (
                            <video autoPlay loop muted className="rounded-2xl ring-1 w-full object-cover aspect-video bg-[#FAF9FA] ring-neutral-200">
                                <source src="/videos/showcase.mp4" type="video/mp4" />
                            </video>
                        ) : (
                            <div ref={ref}></div>
                        )}
                    </div>
                    <div className="pb-56">
                        <div className="flex flex-col gap-3 mb-10">
                            <h2 className="font-semibold md:text-4xl max-md:text-2xl text-black flex gap-4 items-center">Why Bridge when there are a lot of other tools?</h2>
                        </div>
                        <div className="">

                        </div>
                    </div>
                    <div className="p-[1px] rounded-3xl bg-indigo-100 relative overflow-hidden">
                        <div className="pt-16 px-8 bg-white bg-opacity-90 rounded-[23px] relative z-20">
                            <div className="flex flex-col gap-3">
                                <h2 className="font-semibold md:text-3xl max-md:text-2xl text-indigo-500 flex gap-4 items-center justify-center">Integrate in your Pipeline</h2>
                            </div>
                            <div className="max-md:h-80 w-full flex justify-center">
                                <RiveComponent src="/animations/bridge_explanation.riv" className="max-md:w-screen md:w-[85%] max-md:absolute max-md:translate-x-[-50%] left-[50%] aspect-video" />
                            </div>
                        </div>
                        <div className="absolute top-0 bottom-0 right-0 left-0 bg-indigo-400 animate-[spin_10s_linear_infinite] blur-2xl z-10" />
                    </div>
                    <div className="h-56" />
                </div>
            </main>
            {customCursor && <Image
                priority
                src="/images/general/custom_cursor.svg"
                alt="Custom Bridge Cursor"
                width={96}
                height={96}
                ref={cursor}
                className={
                    "fixed z-50 -translate-x-10 -translate-y-8 pointer-events-none max-md:hidden"
                }
            />}
            <div></div>
        </>
    );
}