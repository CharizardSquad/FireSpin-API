// Needed to render logo and background modules correctly
declare module "*.png" {
  const value: string;
  export default value;
}
