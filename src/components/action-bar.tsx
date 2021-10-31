import { useActions } from '../hooks/use-actions';
import FaButton from './fa-button';
import './action-bar.css';

interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
    const { moveCell, deleteCell } = useActions();

    return (
        <div className="action-bar">
            <FaButton
                iconClassName="arrow-up"
                onClick={() => moveCell(id, 'up')}
            />
            <FaButton
                iconClassName="arrow-down"
                onClick={() => moveCell(id, 'down')}
            />
            <FaButton iconClassName="times" onClick={() => deleteCell(id)} />
        </div>
    );
};

export default ActionBar;
