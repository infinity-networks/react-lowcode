export function AsyncLoader() {
  // key 是对应 JS 执行后在 window 中添加的变量
  const keyMap = {} as any;

  const loadScript = (src: string) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.onload = resolve;
      script.onerror = reject;
      script.crossOrigin = "anonymous";
      script.src = src;
      if (document.head.append) {
        document.head.append(script);
      } else {
        document.getElementsByTagName("head")[0].appendChild(script);
      }
    });
  };

  const loadByKey = (key: string) => {
    // 判断对应变量在 window 是否存在，如果存在说明已加载，直接返回，这样可以避免多次重复加载
    if ((window as any)[key]) {
      return Promise.resolve();
    } else {
      if (Array.isArray(keyMap[key])) {
        return Promise.all(keyMap[key].map(loadScript));
      }
      return loadScript(keyMap[key]);
    }
  };
}
