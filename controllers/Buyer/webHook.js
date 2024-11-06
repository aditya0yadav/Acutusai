const { Survey, SurveyQuota, SurveyQualification } = require('../../models/hookSurveyModels');

async function createSurvey(req, res) {
    try {
        const {
            survey_id, survey_name, account_name, country_language, industry, study_type,
            bid_length_of_interview, bid_incidence, collects_pii, survey_group_ids, is_live,
            survey_quota_calc_type, is_only_supplier_in_group, cpi, total_client_entrants,
            total_remaining, completion_percentage, conversion, overall_completes, mobile_conversion,
            earnings_per_click, length_of_interview, termination_length_of_interview, respondent_pids,
            message_reason, survey_quotas, survey_qualifications
        } = req.body;

        const newSurvey = await Survey.create({
            survey_id, survey_name, account_name, country_language, industry, study_type,
            bid_length_of_interview, bid_incidence, collects_pii, survey_group_ids, is_live,
            survey_quota_calc_type, is_only_supplier_in_group, cpi, total_client_entrants,
            total_remaining, completion_percentage, conversion, overall_completes, mobile_conversion,
            earnings_per_click, length_of_interview, termination_length_of_interview, respondent_pids,
            message_reason
        });

        if (survey_quotas) {
            await Promise.all(survey_quotas.map(async (quota) => {
                await SurveyQuota.create({ ...quota, survey_id: newSurvey.survey_id });
            }));
        }

        if (survey_qualifications) {
            await Promise.all(survey_qualifications.map(async (qualification) => {
                await SurveyQualification.create({ ...qualification, survey_id: newSurvey.survey_id });
            }));
        }

        res.status(201).json({ message: 'Survey created successfully', survey: newSurvey });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating survey', error });
    }
}

module.exports = { createSurvey };
