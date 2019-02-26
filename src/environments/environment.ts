// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

/**
 * 	开发环境
 *
 * @author 刘宏强
 */
export const environment = {

  // 是否生产模式
  production: false,
  
  // Web端IP地址和端口
  web: "http://localhost:8080/",
  
  // 管理端IP地址和端口
  manager: "http://localhost:8080/",
  
  // 服务端IP地址和端口
  server: "http://localhost:8080/"
  // server: "http://9hbzcd.natappfree.cc/"
  
};
