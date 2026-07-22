import SuspendedIp from "../models/SuspendedIp.js";

let ensurePromise = null;

export const ensureSuspendedIpTable = async () => {
  if (!ensurePromise) {
    ensurePromise = SuspendedIp.sync().catch((error) => {
      ensurePromise = null;
      throw error;
    });
  }

  return ensurePromise;
};

export default ensureSuspendedIpTable;
