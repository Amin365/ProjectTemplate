export const validateSecurityConfig = () => {
  const errors = [];

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === "please_set_a_secret") {
    errors.push("JWT_SECRET is missing or insecure default");
  }

  if (!process.env.REFRESH_SECRET || process.env.REFRESH_SECRET.includes("please_set_a_secret")) {
    errors.push("REFRESH_SECRET is missing or insecure default");
  }

  if (errors.length) {
    throw new Error(`Security configuration error: ${errors.join("; ")}`);
  }
};
