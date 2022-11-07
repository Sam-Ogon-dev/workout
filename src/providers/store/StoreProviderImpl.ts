import StoreProvider from "./StoreProvider";
import {useAppActions} from "../../store/store";

export default class StoreProviderImpl implements StoreProvider {
  setHeaderTitle (title: string): void {
  }

  getHeaderTitle(): string {
    return "";
  }
}
