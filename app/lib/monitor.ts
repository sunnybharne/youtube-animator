export type MonitorScene = {
  monitorOneMainText: string;
  monitorOneSecondaryText: string | null;
  monitorOneURL: string | null;
  monitorTwoMainText: string;
  monitorTwoSecondaryText: string | null;
  monitorTwoURL: string | null;
  monitorThreeMainText: string;
  monitorThreeSecondaryText: string | null;
  monitorThreeURL: string | null;
};

export const monitorScene: MonitorScene = {
  monitorOneMainText: "AI arrived",
  monitorOneSecondaryText: null,
  monitorOneURL:
    "https://cdn.sanity.io/images/4zrzovbb/website/a745ecb3c1b4db6c6dbbf16fb810d55e460f207f-2400x1260.jpg",
  monitorTwoMainText: "QWEN",
  monitorTwoSecondaryText: null,
  monitorTwoURL: "https://www.searchyour.ai/archivos/qwen-ai-logo.jpg",
  monitorThreeMainText: "Money",
  monitorThreeSecondaryText: null,
  monitorThreeURL:
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExODMxbXMwdHI1MGUycnBzaDA1NGJpYnl5cGFtYXE3aXBhanBhbm4yZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IJHXYdod09wguQJ9j4/giphy.gif",
};
