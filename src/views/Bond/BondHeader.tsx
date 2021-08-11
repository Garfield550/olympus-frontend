import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import BondLogo from "../../components/BondLogo";
import AdvancedSettings from "./AdvancedSettings";
import { bondName } from "../../helpers";
import { Typography, IconButton, SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as SettingsIcon } from "../../assets/icons/v1.2/settings.svg";
import { ReactComponent as XIcon } from "../../assets/icons/v1.2/x.svg";
import useEscape from "../../hooks/useEscape";

interface IBondHeaderProps {
  readonly bond: string;
  readonly recipientAddress: string;
  readonly slippage: number;
  onRecipientAddressChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onSlippageChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

function BondHeader({
  bond,
  slippage,
  recipientAddress,
  onRecipientAddressChange,
  onSlippageChange,
}: IBondHeaderProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let history = useHistory();

  useEscape(() => {
    if (open) handleClose;
    else history.push("/bonds");
  });

  return (
    <div className="bond-header">
      <Link component={NavLink} to="/bonds" className="cancel-bond">
        <SvgIcon color="primary" component={XIcon} />
      </Link>

      <div className="bond-header-logo">
        <BondLogo bond={bond} />
        <div className="bond-header-name">
          <Typography variant="h5">{bondName(bond)}</Typography>
        </div>
      </div>

      <div className="bond-settings">
        <IconButton onClick={handleOpen}>
          <SvgIcon color="primary" component={SettingsIcon} />
        </IconButton>
        <AdvancedSettings
          open={open}
          handleClose={handleClose}
          slippage={slippage}
          recipientAddress={recipientAddress}
          onRecipientAddressChange={onRecipientAddressChange}
          onSlippageChange={onSlippageChange}
        />
      </div>
    </div>
  );
}

export default BondHeader;