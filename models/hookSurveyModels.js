const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config'); 

class Survey extends Model {}

Survey.init({
    survey_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    survey_name: DataTypes.STRING,
    account_name: DataTypes.STRING,
    country_language: DataTypes.STRING,
    industry: DataTypes.STRING,
    study_type: DataTypes.STRING,
    bid_length_of_interview: DataTypes.INTEGER,
    bid_incidence: DataTypes.FLOAT,
    collects_pii: DataTypes.BOOLEAN,
    survey_group_ids: DataTypes.JSON, // Store as JSON for MariaDB compatibility
    is_live: DataTypes.BOOLEAN,
    survey_quota_calc_type: DataTypes.STRING,
    is_only_supplier_in_group: DataTypes.BOOLEAN,
    cpi: DataTypes.FLOAT,
    total_client_entrants: DataTypes.INTEGER,
    total_remaining: DataTypes.INTEGER,
    completion_percentage: DataTypes.FLOAT,
    conversion: DataTypes.FLOAT,
    overall_completes: DataTypes.INTEGER,
    mobile_conversion: DataTypes.FLOAT,
    earnings_per_click: DataTypes.FLOAT,
    length_of_interview: DataTypes.INTEGER,
    termination_length_of_interview: DataTypes.INTEGER,
    respondent_pids: DataTypes.JSON, // Store as JSON for MariaDB compatibility
    message_reason: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Survey',
    tableName: 'surveys'
});

class SurveyQuota extends Model {}

SurveyQuota.init({
    survey_quota_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    survey_id: {
        type: DataTypes.INTEGER,
        references: { model: Survey, key: 'survey_id' }
    },
    survey_quota_type: DataTypes.STRING,
    quota_cpi: DataTypes.FLOAT,
    conversion: DataTypes.FLOAT,
    number_of_respondents: DataTypes.INTEGER,
    questions: DataTypes.JSON // Store questions array as JSON
}, {
    sequelize,
    modelName: 'SurveyQuota',
    tableName: 'survey_quotas'
});

class SurveyQualification extends Model {}

SurveyQualification.init({
    qualification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    survey_id: {
        type: DataTypes.INTEGER,
        references: { model: Survey, key: 'survey_id' }
    },
    logical_operator: DataTypes.STRING,
    precodes: DataTypes.JSON, // Store as JSON for compatibility
    question_id: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'SurveyQualification',
    tableName: 'survey_qualifications'
});



// Associations
Survey.hasMany(SurveyQuota, { foreignKey: 'survey_id', as: 'survey_quotas' });
SurveyQuota.belongsTo(Survey, { foreignKey: 'survey_id' });

Survey.hasMany(SurveyQualification, { foreignKey: 'survey_id', as: 'survey_qualifications' });
SurveyQualification.belongsTo(Survey, { foreignKey: 'survey_id' });

module.exports = { Survey, SurveyQuota, SurveyQualification };
