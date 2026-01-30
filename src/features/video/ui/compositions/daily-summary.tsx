import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { DailySummaryProps } from "../../model/types";
import { getThemeColors } from "../../lib/colors";

export function DailySummary({
  calories,
  caloriesGoal,
  protein,
  fat,
  carbs,
  fiber,
  proteinGoal,
  fatGoal,
  carbsGoal,
  fiberGoal,
  themeColor,
  date,
  meals,
}: DailySummaryProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = getThemeColors(themeColor);

  const isOverCalories = calories > caloriesGoal;

  // Scene 1: Title (0-7)
  const titleOpacity = interpolate(frame, [0, 7], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 7], [40, 0], {
    extrapolateRight: "clamp",
  });

  // Scene 2: Calorie circle (7-35)
  const circleScale = spring({
    frame: frame - 7,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const calorieProgress = interpolate(frame, [9, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ratio = calories / caloriesGoal;
  const circleRadius = 260;
  const circleSize = 620;
  const circumference = 2 * Math.PI * circleRadius;
  const visualRatio = Math.min(ratio, 1);
  const strokeDashoffset = circumference * (1 - visualRatio * calorieProgress);
  const circleStrokeColor = isOverCalories ? c.destructive : c.primary;
  const calorieDiff = Math.abs(calories - caloriesGoal);

  // Scene 3: Macros bars (30-50)
  const macrosData = [
    { label: "Protein", value: protein, goal: proteinGoal },
    { label: "Fat", value: fat, goal: fatGoal },
    { label: "Carbs", value: carbs, goal: carbsGoal },
    { label: "Fiber", value: fiber, goal: fiberGoal },
  ];

  // Scene 4: Meals (48-75)
  // Scene 5: Outro (73-88)
  const outroOpacity = interpolate(frame, [73, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: c.background,
        fontFamily: "Inter, system-ui, sans-serif",
        marginTop: -60,
        paddingBottom: 80,
        paddingLeft: 24,
        paddingRight: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Top spacer for vertical centering */}
      <div style={{ marginBottom: "auto" }} />

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            color: c.primary,
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: 3,
          }}
        >
          My Day
        </div>
        <div
          style={{
            color: c.mutedForeground,
            fontSize: 50,
            marginTop: 10,
          }}
        >
          {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Calorie Circle */}
      <div
        style={{
          transform: `scale(${circleScale})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          width: circleSize,
          height: circleSize,
          marginBottom: 24,
        }}
      >
        <svg
          width={circleSize}
          height={circleSize}
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={circleRadius}
            fill="none"
            stroke={c.muted}
            strokeWidth={100}
          />
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={circleRadius}
            fill="none"
            stroke={circleStrokeColor}
            strokeWidth={100}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: isOverCalories ? c.destructive : c.foreground,
              fontSize: 90,
              fontWeight: 700,
            }}
          >
            {Math.round(calories * calorieProgress)}
          </div>
          <div style={{ color: c.mutedForeground, fontSize: 42 }}>
            of {caloriesGoal} kcal
          </div>
          {calorieDiff > 0 && (
            <div
              style={{
                color: isOverCalories ? c.destructive : c.primary,
                fontSize: 34,
                fontWeight: 600,
                marginTop: 8,
                opacity: calorieProgress,
              }}
            >
              {isOverCalories
                ? `+${Math.round(calorieDiff * calorieProgress)} over`
                : `${Math.round(calorieDiff)} left`}
            </div>
          )}
        </div>
      </div>

      {/* Macros Bars */}
      <div style={{ width: "100%", maxWidth: 960, marginBottom: 24 }}>
        {macrosData.map((macro, i) => {
          const slideIn = spring({
            frame: frame - 30 - i * 4,
            fps,
            config: { damping: 15, stiffness: 120 },
          });
          const translateX = interpolate(slideIn, [0, 1], [200, 0]);
          const barProgress = spring({
            frame: frame - 34 - i * 4,
            fps,
            config: { damping: 15, stiffness: 120 },
          });
          const isOver = macro.goal > 0 && macro.value > macro.goal;
          const barRatio =
            macro.goal > 0 ? Math.min(macro.value / macro.goal, 1) : 0;
          const barColor = isOver ? c.destructive : c.primary;

          return (
            <div
              key={macro.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginBottom: 16,
                transform: `translateX(${translateX}px)`,
                opacity: slideIn,
              }}
            >
              <div
                style={{
                  color: c.foreground,
                  fontSize: 38,
                  fontWeight: 500,
                  width: 120,
                  textAlign: "right",
                }}
              >
                {macro.label}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 50,
                  backgroundColor: c.muted,
                  borderRadius: 24,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${barRatio * 100 * barProgress}%`,
                    backgroundColor: barColor,
                    borderRadius: 18,
                  }}
                />
              </div>
              <div
                style={{
                  color: isOver ? c.destructive : c.mutedForeground,
                  fontSize: 32,
                  width: 160,
                }}
              >
                {Math.round(macro.value * barProgress)} / {macro.goal}g
              </div>
            </div>
          );
        })}
      </div>

      {/* Meal List */}
      <div style={{ width: "100%", maxWidth: 900 }}>
        {meals.map((meal, i) => {
          const slideIn = spring({
            frame: frame - 48 - i * 5,
            fps,
            config: { damping: 15, stiffness: 120 },
          });
          const translateX = interpolate(slideIn, [0, 1], [200, 0]);
          return (
            <div
              key={`${meal.type}-${i}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "28px",
                marginBottom: 12,
                backgroundColor: c.cardBackground,
                borderRadius: 14,
                transform: `translateX(${translateX}px)`,
                opacity: slideIn,
              }}
            >
              <div>
                {/* <div
                  style={{
                    color: c.mutedForeground,
                    fontSize: 18,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {meal.type}
                </div> */}
                <div
                  style={{
                    color: c.foreground,
                    fontSize: 28,
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  {meal.name}
                </div>
              </div>
              <div
                style={{
                  color: c.primary,
                  fontSize: 36,
                  fontWeight: 700,
                }}
              >
                {meal.totalKcal} kcal
              </div>
            </div>
          );
        })}
      </div>

      {/* Outro */}
      <div
        style={{
          opacity: outroOpacity,
          marginTop: "auto",
          textAlign: "center",
        }}
      >
        <svg
          width={278}
          height={64}
          viewBox="0 0 139 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0.917999H9.5931L18.2682 28.1367H18.819V0.917999H24.1434V33.048H14.5044L5.8752 5.8293H5.3244V33.048H0V0.917999Z"
            fill={c.foreground}
          />
          <path
            d="M51.5572 33.048H46.6V29.2842H45.9574C44.7028 32.0382 42.2395 33.4152 38.5675 33.4152C36.0277 33.4152 33.9163 32.5737 32.2333 30.8907C30.5809 29.2077 29.7547 26.8974 29.7547 23.9598V10.4193H34.8037V23.5008C34.8037 25.2756 35.278 26.6373 36.2266 27.5859C37.1752 28.5345 38.5216 29.0088 40.2658 29.0088C42.2548 29.0088 43.7848 28.4121 44.8558 27.2187C45.9574 26.0253 46.5082 24.3423 46.5082 22.1697V10.4193H51.5572V33.048Z"
            fill={c.foreground}
          />
          <path
            d="M54.8494 10.4193H60.8623V2.9835H65.9113V10.4193H72.3373V14.7798H65.9113V27.3564C65.9113 28.2438 66.3244 28.6875 67.1506 28.6875H71.0521V33.048H64.9933C63.7999 33.048 62.8054 32.6655 62.0098 31.9005C61.2448 31.1355 60.8623 30.141 60.8623 28.917V14.7798H54.8494V10.4193Z"
            fill={c.foreground}
          />
          <path
            d="M81.4241 10.4193V13.9077H82.0667C82.8623 11.5209 84.7901 10.3275 87.8501 10.3275H90.2369V15.0552H86.5649C85.0043 15.0552 83.7803 15.4836 82.8929 16.3404C82.0055 17.1972 81.5618 18.4365 81.5618 20.0583V33.048H76.5128V10.4193H81.4241Z"
            fill={c.foreground}
          />
          <path
            d="M92.4401 3.672C92.4401 2.601 92.8073 1.7289 93.5417 1.0557C94.2761 0.3519 95.1788 0 96.2498 0C97.3208 0 98.2082 0.3519 98.912 1.0557C99.6464 1.7289 100.014 2.601 100.014 3.672C100.014 4.7124 99.6464 5.5845 98.912 6.2883C98.2082 6.9921 97.3208 7.344 96.2498 7.344C95.1788 7.344 94.2761 6.9921 93.5417 6.2883C92.8073 5.5845 92.4401 4.7124 92.4401 3.672ZM98.7743 10.4193V33.048H93.7253V10.4193H98.7743Z"
            fill={c.foreground}
          />
          <path
            d="M111.641 0.917999H120.133L129.588 33.048H124.034L121.923 25.6122H109.851L107.694 33.048H102.14L111.641 0.917999ZM111.182 20.7468H120.592L116.14 5.4621H115.589L111.182 20.7468Z"
            fill={c.primary}
          />
          <path
            d="M133.038 0.917999H138.363V33.048H133.038V0.917999Z"
            fill={c.primary}
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
}
