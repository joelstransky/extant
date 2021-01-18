interface MetaPayload {
  meta?: string;
}
interface MamePath extends MetaPayload {
  mamepath: string;
}

interface ListXML extends MetaPayload {
  isCreatingXML: boolean;
}
interface ConvertXML extends MetaPayload {
  isConvertingXML: boolean;
}

type CurrentSettingsState = {
  isOpen: boolean;
} & ListXML &
  ConvertXML &
  MamePath;

interface SetRomsJSON {
  json: [];
}
interface FindRoms extends MetaPayload {
  query: any;
}
type CurrentRomState = {} & SetRomsJSON & FindRoms;
