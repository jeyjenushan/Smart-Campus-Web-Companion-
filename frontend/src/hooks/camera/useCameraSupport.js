export function useCameraSupport() {
  return !!navigator.mediaDevices?.getUserMedia;
}