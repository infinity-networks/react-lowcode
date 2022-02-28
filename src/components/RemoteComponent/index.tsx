import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

interface RemoteComponentProps {
  path: string;
  props: any;
}

export const RemoteComponent = ({ path, props }: any) => {
  const [Component, setComponent] = useState<React.FC | null>(null);

  const importComponent = useCallback(async () => {
    const res = await axios.get(`http://127.0.0.1:8080/${path}`);
    return res.data;
  }, [path]);

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
    return <Component {...props} />;
  }

  return null;
};
