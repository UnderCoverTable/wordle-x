"use client";
import { useColorMode } from "@/components/ui/color-mode";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { DIMENSION_OPTIONS } from "@/helpers";
import { getSessionId } from "@/utils/session/session";
import { ChevronRightIcon, EmailIcon } from "@chakra-ui/icons";
import { Progress, Stat, Text, useToken } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type BreakdownItem = {
  word_length: number;
  total_played: number;
  total_won: number;
  total_lost: number;
};

type CardDataInput = {
  totals?: {
    total_played: number;
    total_won: number;
    total_lost: number;
  };
  breakdown: BreakdownItem[];
};

const formatCardData = (data: CardDataInput) => {
  const formatted = DIMENSION_OPTIONS.map((length) => {
    const match = data.breakdown.find((b) => b.word_length === length);
    return {
      word_length: length,
      total_played: match?.total_played ?? 0,
      total_won: match?.total_won ?? 0,
      total_lost: match?.total_lost ?? 0,
    };
  });

  return { total: data.totals, breakdown: formatted };
};

export default function Profile() {
  const { user, authLoading } = useAuth() ?? { user: null, authLoading: false };
  const { user_metadata } = user || {};
  const { colorMode } = useColorMode();

  const [correctColor, wrongColor, maybeColor] = useToken("colors", [
    `correct.${colorMode}`,
    `wrong.${colorMode}`,
    `maybe.${colorMode}`,
  ]);

  const { display_name: displayName, email } = user_metadata || {};
  const [hoveredStack, setHoveredStack] = useState<number | null>(null);
  const [gameStats, setGameStats] = useState<{ total?: { total_played: number; total_won: number; total_lost: number }; breakdown?: any[] }>({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `/api/stats?sessionID=${user?.id ?? getSessionId()}`,
          { cache: "no-store" }
        );
        const json = await response.json();

        if (json.success) {
          setGameStats(formatCardData(json.data));
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    if (!authLoading) fetchStats();
  }, [authLoading]);

  return (
    <div className="flex flex-col items-center gap-6 !mt-6">
      <div className="w-full max-w-lg mx-auto">
        {/* Profile Card */}
        <div className="relative !p-4 bg-[#2A2A2A] backdrop-blur-xl text-white rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
          <div className="relative z-10 p-8">
            {/* Top Section */}
            <div className="flex items-center gap-6 mb-10">
              {/* Avatar */}
              <div className="relative">
                <div
                  className="flex items-center justify-center rounded-2xl font-bold shadow-lg border-2 border-white/20 backdrop-blur-sm"
                  style={{
                    width: "90px",
                    height: "90px",
                    backgroundColor: correctColor,
                    fontSize: "36px",
                  }}
                >
                  {displayName?.[0]?.toUpperCase()}
                </div>
              </div>

              {/* Name & Email */}
              <div className="flex flex-col flex-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {displayName}
                </span>
                <div className="flex items-center gap-2 text-gray-300 mt-1">
                  <EmailIcon boxSize={4} />
                  <span className="text-sm">{email ?? "No email set"}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Section */}
            {gameStats?.total && (
              <div className="flex flex-col gap-6">
                <h3 className="text-lg font-semibold text-gray-200"></h3>

                <div className="grid grid-cols-3 gap-5">
                  {/* Games Played */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl !pl-5 !pb-2 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-blue-400/30">
                    <Stat.Root className="flex flex-col items-start">
                      <Stat.Label className="text-gray-400 text-sm mb-1">
                        <Text className="fw-600"> Played</Text>
                      </Stat.Label>
                      <Stat.ValueText className="text-lg font-semibold leading-tight">
                        {gameStats.total.total_played}
                      </Stat.ValueText>
                    </Stat.Root>
                  </div>

                  {/* Games Won */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl !pl-5 !pb-2 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-blue-400/30">
                    <Stat.Root className="flex flex-col items-start">
                      <Stat.Label className="text-gray-400 text-sm mb-1">
                        Won
                      </Stat.Label>
                      <Stat.ValueText className="text-lg font-semibold leading-tight">
                        {gameStats.total.total_won}
                      </Stat.ValueText>
                    </Stat.Root>
                  </div>

                  {/* Games Lost */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl !pl-5 !pb-2 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-blue-400/30">
                    <Stat.Root className="flex flex-col items-start">
                      <Stat.Label className="text-gray-400 text-sm mb-1">
                        Lost
                      </Stat.Label>
                      <Stat.ValueText className="text-lg font-semibold leading-tight">
                        {gameStats.total.total_lost}
                      </Stat.ValueText>
                    </Stat.Root>
                  </div>
                </div>

                {/* Win Rate Bar */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl !p-4 border border-white/10">
                  {(() => {
                    const winRate = Math.round(
                      (gameStats.total.total_won /
                        gameStats.total.total_played) *
                        100
                    );

                    const getProgressGradient = () => {
                      if (winRate >= 70) return correctColor; // High win rate
                      if (winRate >= 40) return maybeColor; // Medium win rate
                      return "linear-gradient(to right, #f87171, #ec4899)"; // Low win rate (fallback gradient)
                    };

                    return (
                      <>
                        {/* Row with label + percentage */}
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-300 font-medium">
                            Win Rate
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{
                              background: getProgressGradient(),
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            {winRate}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <Progress.Root
                          width="100%"
                          height="100%"
                          defaultValue={winRate}
                          className="overflow-hidden rounded-full border border-white/10 h-3 bg-gray-800"
                        >
                          <Progress.Track className="bg-transparent">
                            <Progress.Range
                              className="h-full transition-all duration-500"
                              style={{
                                background: getProgressGradient(),
                              }}
                            />
                          </Progress.Track>
                        </Progress.Root>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-x-100 gap-y-16 justify-items-center max-w-4xl mx-auto">
        {gameStats.breakdown?.map((stat, i) => {
          const cards = [
            { label: "Played", value: stat.total_played, color: wrongColor },
            { label: "Won", value: stat.total_won, color: correctColor },
            { label: "Lost", value: stat.total_lost, color: maybeColor },
          ];

          return (
            <div
              key={stat.word_length}
              className="relative flex-shrink-0 w-[180px] h-[140px]"
            >
              <div className="flex flex-row">
                <div
                  className="flex items-center justify-center rounded-sm font-bold shadow-lg border-2 border-white/20 backdrop-blur-sm"
                  style={{
                    width: "55px",
                    height: "30px",
                    backgroundColor: correctColor,
                    fontSize: "16px",
                    marginBottom: "6px",
                    marginLeft: "8px",
                    fontWeight: "600",
                  }}
                >
                  {stat.word_length}
                </div>{" "}
                {"LETTER".split("").map((item) => {
                  return (
                    <div
                      className="flex items-center justify-center rounded-sm font-bold shadow-lg border-2 border-black/20 backdrop-blur-sm"
                      style={{
                        width: "55px",
                        height: "27px",
                        backgroundColor: "grey",
                        fontSize: "16px",
                        marginBottom: "6px",
                        marginLeft: "8px",
                        fontWeight: "600",
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>

              <motion.div
                className="relative flex justify-end w-full h-full overflow-visible"
                onHoverStart={() => setHoveredStack(stat.word_length)}
                onHoverEnd={() => setHoveredStack(null)}
              >
                {cards.map((card, index) => {
                  const isTopCard = index === 0;
                  return (
                    <motion.div
                      key={card.label}
                      animate={{
                        x:
                          hoveredStack === stat.word_length && !isTopCard
                            ? index === 1
                              ? 150
                              : 300
                            : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="absolute top-0 rounded-2xl shadow-xl p-4 flex flex-col items-center justify-center text-center"
                      style={{
                        left: `${index * 20}px`,
                        zIndex: cards.length - index,
                        width: "160px",
                        height: "110px",
                        background: card.color,
                      }}
                    >
                      {/* Centered Card Content */}
                      <Text style={{ fontWeight: 800, fontSize: "18px" }}>
                        {" "}
                        {card.label}
                      </Text>
                      <Text style={{ fontWeight: 800, fontSize: "18px" }}>
                        {" "}
                        {card.value}
                      </Text>

                      {/* Chevron only for top card */}
                      {isTopCard && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: hoveredStack === stat.word_length ? 1 : 0,
                            x: hoveredStack === stat.word_length ? 0 : -10,
                          }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-10 right-3"
                        >
                          <ChevronRightIcon className="w-6 h-6 text-white/90" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
