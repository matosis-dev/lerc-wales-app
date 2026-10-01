import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Button } from '@flumens';
import { isPlatform } from '@ionic/react';
import AnimatedNumber from './AnimatedNumber';

interface Props {
  onClick: any;
  onLongClick?: any;
  value?: number | string;
  disabled?: boolean;
}

const IncrementalButton = ({
  onClick: onClickProp,
  onLongClick: onLongClickProp,
  value,
  disabled,
}: Props) => {
  const valueFiniteNumber = parseFiniteNumber(value);
  const isString = typeof value === 'string';

  const onClick = () => {
    if (disabled || isString) return;

    onClickProp();

    isPlatform('hybrid') && Haptics.impact({ style: ImpactStyle.Light });
  };

  const onLongClick = () => {
    if (disabled || isString) return;

    if (!onLongClickProp) {
      onClickProp();
      return;
    }

    onLongClickProp();

    isPlatform('hybrid') && Haptics.impact({ style: ImpactStyle.Light });
  };

  let valueItem;
  if (valueFiniteNumber) {
    valueItem = <AnimatedNumber value={valueFiniteNumber} />;
  } else if (value) {
    valueItem = <span className="truncate px-2 text-sm">{value}</span>;
  } else {
    valueItem = <span className="empty">N/A</span>;
  }

  return (
    <Button
      className="relative m-0 h-full w-[62px] shrink-0 rounded-none border-0 border-r border-solid !border-gray-100 p-0 text-lg font-normal text-[var(--color-tertiary-800)] [&>*]:h-full"
      onPress={onClick}
      fill="clear"
      onLongPress={onLongClick}
      preventDefault
    >
      <div className="flex h-full w-full items-center justify-center">
        {valueItem}
      </div>
      <div className="label-divider" />
    </Button>
  );
};

function parseFiniteNumber(value: unknown): number | undefined {
  return Number.isFinite(value) ? Number(value) : undefined;
}

export default IncrementalButton;
