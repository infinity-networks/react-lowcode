import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const RemoteComponent = ({ url, props }: any) => {
  const [Component, setComponent] = useState<React.FC | null>(null);

  const importComponent = useCallback(() => {
    return axios.get(url).then((res) => res.data);
  }, [url]);

  const loadComponent = useCallback(async () => {
    // new Function(`${await importComponent()}`)();
    window.eval(`${await importComponent()}`);
    const { default: component } = (window as any).ComlibH5Normal;
    setComponent(() => component);
  }, [importComponent, setComponent]);

  useEffect(() => {
    loadComponent();
  }, [loadComponent]);

  if (Component) {
    <Component {...props} />;
  }

  return null;
};
