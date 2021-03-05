import * as React from "react";

export const navigationRef = React.createRef<any>();

export function navigate(name: string, params?: any) {
  if (typeof navigationRef.current === "undefined") {
    return;
  }
  navigationRef.current.navigate(name, params);
}

export function goBack() {
  if (typeof navigationRef.current === "undefined") {
    return;
  }
  navigationRef.current.goBack();
}
