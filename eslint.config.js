import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.js", "scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // 
      globals: {
        process: "readonly",
        console: "readonly",
        require: "readonly",     
        module: "readonly",       
        __dirname: "readonly",    
        exports: "writable",
      },
    },
    rules: {
      
    },
  },
];