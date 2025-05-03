import React from 'react';
import Left from './LeftPart/Left';
import Right from './RightPart/Right';
import Navbar from '../navbar/Navbar';

function Front() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex h-screen pt-16" style={{position:'relative'}}>
                <Left />
                <Right />
            </div>
        </div>
    );
}

export default Front;

