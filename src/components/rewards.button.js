import React from 'react';
import Reward from 'react-rewards';
import ButtonWithLoading from './button.with.loading';

const RewardsSaveButton = React.forwardRef((props, ref) => {
    const onClickHandler = props.onClickHandler;
    const rewardRef = React.useRef(null);
    const saveButtonRef = React.useRef(null);
    const rewardConfig = {
        lifetime: 200,
        angle: 90,
        decay: 0.91,
        spread: 45,
        startVelocity: 30,
        elementCount: 60,
        elementSize: 10,
    };

    const click = async () => {
        if (saveButtonRef) {
            saveButtonRef.current.click();
        } else {
            await handleButtonClick();
        }
    };

    React.useImperativeHandle(ref, () => ({
        click,
    }));

    const handleButtonClick = async () => {
        let result = true;

        if (onClickHandler) {
            result = await onClickHandler();

            if (rewardRef) {
                result === false
                    ? rewardRef.current.punishMe()
                    : rewardRef.current.rewardMe();
            }
        }

        return result;
    };

    return (
        <Reward ref={rewardRef} type="confetti" config={rewardConfig}>
            <ButtonWithLoading
                ref={saveButtonRef}
                onClickHandler={handleButtonClick}
                left={props.left}
                top={props.top}
            />
        </Reward>
    );
});

export default RewardsSaveButton;
