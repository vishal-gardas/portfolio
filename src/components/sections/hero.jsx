"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import XTwitterIcon from "@/components/icons/x-twitter";
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import DiscordIcon from "@/components/icons/discord";
import { IoIosMail } from "react-icons/io";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GeistPixelSquare } from "geist/font/pixel";
import GitHubContributionGraph from "./contribution-graph";
import { CornerBrackets } from "@/components/ui/corner-brackets";
import { notableAchievements } from "@/constants";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LocationIcon from "@/components/icons/location";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
});

const socialLinks = [
  {
    label: "Twitter",
    href: "https://x.com/sh17va",
    icon: <XTwitterIcon className="h-3.5 w-3.5" />,
    external: true,
    platform: "twitter",
    username: "sh17va",
  },
  {
    label: "Github",
    href: "https://github.com/shivabhattacharjee",
    icon: <GithubIcon className="h-3.5 w-3.5" />,
    external: true,
    platform: "github",
    username: "shivabhattacharjee",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shiva-bhattacharjee/",
    icon: <LinkedinIcon className="h-3.5 w-3.5" />,
    external: true,
    platform: "linkedin",
    username: "shiva-bhattacharjee",
  },
  {
    label: "Discord",
    href: "https://discordapp.com/users/503152077824851968",
    icon: <DiscordIcon className="h-3.5 w-3.5" />,
    external: true,
    platform: "discord",
    username: "503152077824851968",
  },
  {
    label: "Email",
    href: "mailto:hello@theshiva.xyz",
    icon: <IoIosMail size="14px" />,
    external: true,
  },
];

function SocialPreviewCard({ loading, data, platform, username }) {


  if (loading) {
    return (
      <div className="flex w-[320px] flex-col gap-4 font-space-mono animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-muted"></div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded bg-muted"></div>
            <div className="h-3 w-20 rounded bg-muted"></div>
          </div>
        </div>
        <div className="h-10 w-full rounded bg-muted"></div>
        <div className="h-4 w-24 rounded bg-muted"></div>
        <div className="mt-2 flex gap-4">
          <div className="h-4 w-16 rounded bg-muted"></div>
          <div className="h-4 w-16 rounded bg-muted"></div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex w-[320px] flex-col gap-2 font-space-mono text-left">
      {data.banner && (
        <div className="-mx-4 -mt-4 mb-2 h-20 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.banner} alt="Banner" className="h-full w-full object-cover" />
        </div>
      )}
      <div className={`flex gap-3 relative z-10 ${data.banner ? "flex-col items-start -mt-12" : "items-center"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.avatar || "https://github.com/shivabhattacharjee.png"}
          alt={data.name}
          className={`rounded-full object-cover bg-background ${data.banner ? "h-[68px] w-[68px] border-[3px] border-card" : "h-14 w-14 border border-border"}`}
        />
        <div className={`flex flex-col ${data.banner ? "-mt-1" : ""}`}>
          <span className="font-doto text-base font-bold text-foreground">
            {data.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {data.username}
          </span>
        </div>
      </div>
      {data.bio && (
        <p className="text-sm text-foreground line-clamp-3">
          {data.bio}
        </p>
      )}
      {data.location && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <LocationIcon className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{data.location}</span>
        </div>
      )}
      {data.stats && data.stats.length > 0 && (
        <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
          {data.stats.map((stat, i) => (
            <span key={i}>
              <strong className="font-doto font-semibold text-foreground">
                {stat.value}
              </strong>{" "}
              {stat.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SocialButton({ label, href, icon, external, platform, username, data, loading }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    x.set(e.clientX - 160);
    y.set(e.clientY + 12);
  };

  const handleMouseEnter = (e) => {
    x.set(e.clientX - 160);
    y.set(e.clientY + 12);
    springX.jump(e.clientX - 160);
    springY.jump(e.clientY + 12);
    setIsHovered(true);
  };

  const content = (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <CornerBrackets>
        <Button size="sm" variant="noShadow">
          {icon}
          <span className="ml-1.5">{label}</span>
        </Button>
      </CornerBrackets>
    </Link>
  );

  if (platform && username) {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative"
      >
        {content}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex w-[320px] flex-col gap-3 rounded-xl overflow-hidden bg-background/30 backdrop-blur-2xl backdrop-saturate-150 p-4 shadow-2xl border border-white/20 dark:border-white/10"
              style={{
                position: "fixed",
                left: springX,
                top: springY,
                zIndex: 9999,
                pointerEvents: "none",
              }}
            >
              <SocialPreviewCard platform={platform} username={username} data={data} loading={loading} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return content;
}

const WaveEmoji = () => {
  const [phase, setPhase] = useState("idle");
  const [key, setKey] = useState(0);

  useEffect(() => {
    setPhase("waving");
    const timer = setTimeout(() => setPhase("grayscale"), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setKey((k) => k + 1);
    setPhase("hover-wave");
  };

  const handleMouseLeave = () => {
    setPhase("grayscale");
  };

  const isWaving = phase === "waving" || phase === "hover-wave";
  const isGrayscale = phase === "grayscale";

  return (
    <span
      key={key}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block origin-[70%_70%] cursor-default transition-all duration-500 ${isWaving ? "animate-wave-slow" : ""} ${isGrayscale ? "grayscale" : ""}`}
    >
      👋🏻
    </span>
  );
};

const Hero = ({ contributionData = [], lifetimeTotal = 0 }) => {
  const [socialData, setSocialData] = useState(null);
  const [socialsLoading, setSocialsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/socials")
      .then((res) => res.json())
      .then((data) => {
        if (mounted && !data.error) {
          setSocialData(data);
        }
        if (mounted) setSocialsLoading(false);
      })
      .catch(() => {
        if (mounted) setSocialsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mx-auto flex flex-col gap-10 md:max-w-4xl">
      <motion.div className="flex flex-col gap-6" {...fadeUp(0)}>
        <div className={GeistPixelSquare.className}>
          <p className="mb-3 font-doto text-xs text-muted-foreground md:text-sm">
            Hola I&apos;m <WaveEmoji />
          </p>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-2xl font-bold uppercase tracking-tight md:text-4xl">
              Vishal Gardas
            </h1>
          </div>

          <p className="mt-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground md:text-sm">
            I work on AI, LLMs, and building developer tools on top of them
          </p>
        </div>
      </motion.div>

      <div className="space-y-8">
        <motion.div {...fadeUp(0.15)}>
          <h5 className="mb-4 font-doto text-2xl font-medium md:text-3xl">
            About Me
          </h5>
          <p className="text-xs font-space-mono md:text-base md:leading-relaxed text-muted-foreground">
            I&apos;m Vishal, an <strong className="font-semibold text-foreground">ML Engineer</strong> currently in my final year pursuing B.Tech in <strong className="font-semibold text-foreground">Computer Science and Engineering (AI/ML)</strong> at <strong className="font-semibold text-foreground">VIT Vellore</strong>. I&apos;m passionate about Artificial Intelligence, Machine Learning, LLMs, and building intelligent systems that solve real-world problems.
          </p>

          <p className="mt-4 text-xs font-space-mono md:text-base md:leading-relaxed text-muted-foreground">
            Alongside academics, I spend most of my time exploring AI research, experimenting with machine learning models, and improving my problem-solving skills. I&apos;m currently preparing for the <strong className="font-semibold text-foreground">GATE examination</strong> and planning to pursue a <strong className="font-semibold text-foreground">Master&apos;s in Artificial Intelligence</strong> to deepen my understanding of advanced AI systems and research.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.25)}>
          <p className="mb-3 text-xs text-muted-foreground md:text-sm">
            My{" "}
            <span className="font-semibold text-foreground">social links</span>{" "}
            if you wish to connect with me
          </p>
          <div className="flex flex-wrap gap-2 p-1">
            {socialLinks.map(({ label, href, icon, external, platform, username }) => (
              <SocialButton
                key={label}
                label={label}
                href={href}
                icon={icon}
                external={external}
                platform={platform}
                username={username}
                data={socialData?.[platform]}
                loading={socialsLoading}
              />
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.35)}>
          <GitHubContributionGraph
            data={contributionData}
            lifetimeTotal={lifetimeTotal}
          />
        </motion.div>

        <motion.div {...fadeUp(0.45)}>
          <h5 className="mb-4 font-doto text-2xl font-medium md:text-3xl">
            Notable achievements
          </h5>
          <ul className="space-y-6">
            {notableAchievements.map(({ title, body, link, linkLabel }) => (
              <li
                key={title}
                className="border-l-2 border-muted-foreground/25 pl-4"
              >
                <span className="text-sm font-semibold text-foreground md:text-base">
                  {title}.{" "}
                </span>
                <span className="font-space-mono text-sm leading-relaxed text-muted-foreground md:text-base">
                  {Array.isArray(body)
                    ? body.map((seg, i) =>
                      seg.href ? (
                        <Link
                          key={i}
                          href={seg.href}
                          className="font-semibold text-foreground underline underline-offset-2 transition-colors hover:text-foreground/70"
                        >
                          {seg.text}
                        </Link>
                      ) : seg.bold ? (
                        <strong key={i} className="font-semibold text-foreground">
                          {seg.text}
                        </strong>
                      ) : (
                        <span key={i}>{seg.text}</span>
                      )
                    )
                    : body}
                </span>
                {link && (
                  <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-sm text-foreground/70 underline underline-offset-2 transition-colors hover:text-foreground md:text-base"
                  >
                    {linkLabel}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

    </div>
  );
};

export default Hero;
