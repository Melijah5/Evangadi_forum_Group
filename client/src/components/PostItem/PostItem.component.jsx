import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './PostItem.styles.scss';
import Question from '../Question/Question';

const PostItem = ({ question: { id, question, question_description, tagname, user_name, user_id, comment_count, created_at } }) => {
    return (


        <div className='posts'>

            <Question
                // id ={id}
                question={question}
                question_description={question_description}
                user_name={user_name}
                id={user_id}
                tagname={tagname}
                created_at={created_at}
            />

        </div>

    )
};

PostItem.propTypes = {
    question: PropTypes.object.isRequired
};


export default connect(null)(PostItem);